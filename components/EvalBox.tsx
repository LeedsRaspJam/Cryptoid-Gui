import type { NextPage } from "next";
import CodeMirror from "@uiw/react-codemirror";
import { oneDark as oneDarkTheme } from "@codemirror/theme-one-dark";
import { useState } from "react";
import { addStylingToNotification } from "../lib/notifications";
import useSWR from "swr";
import { fetcher } from "../lib/consts";
import type { ListFilesResponseData } from "../pages/api/eval/listFiles";
import {
  Box,
  Autocomplete,
  Button,
  Group,
  Code,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import { SaveFileResponseData } from "../pages/api/eval/saveFile";
import { RunEvalResponseData } from "../pages/api/eval/runEval";
import { useModals } from "@mantine/modals";
import { useForm } from "@mantine/form";
const EvalBox: NextPage = () => {
  const [editorContent, setEditorContent] = useState<string>();
  const notifications = useNotifications();
  const modals = useModals();
  const fileNameForm = useForm({
    initialValues: {
      filename: "",
    },
    validate: {
      filename: (value) =>
        /^(?!\.)(?!com[0-9]$)(?!con$)(?!lpt[0-9]$)(?!nul$)(?!prn$)[^\|*\?\\:<>/$"]*[^\.\|*\?\\:<>/$"]+$/.test(
          value
        )
          ? null
          : "Invalid filename",
    },
  });
  let confirmedOverwrite = false;
  const { data: evalFileNames }: { data?: ListFilesResponseData } = useSWR(
    "api/eval/listFiles",
    fetcher
  );
  async function loadEvalCode() {
    if (fileNameForm.validate().hasErrors) return;
    const fileNameInput = fileNameForm.values.filename;
    const params = new URLSearchParams();
    params.append("filename", fileNameInput);
    const response = await fetch("api/eval/getFile?" + params);
    if (response.status == 200) {
      const code = (await response.json()).code;
      setEditorContent(code);
      notifications.showNotification(
        addStylingToNotification({
          type: "success",
          title: "Eval",
          message: (
            <Text>
              Successfully loaded <Code>{fileNameInput}</Code>
            </Text>
          ),
        })
      );
    } else {
      notifications.showNotification(
        addStylingToNotification({
          type: "error",
          title: "Eval",
          message: (
            <Text>
              <Code>{fileNameInput}</Code> does not exist on disk
            </Text>
          ),
        })
      );
    }
  }
  async function saveEvalCode() {
    if (fileNameForm.validate().hasErrors) return;
    const fileNameInput = fileNameForm.values.filename;
    if (evalFileNames?.files.includes(fileNameInput) && !confirmedOverwrite) {
      modals.openConfirmModal({
        title: "Please confirm your action",
        children: (
          <Text size="sm">
            A file with this filename already exists, please confirm you want to
            overwrite this file
          </Text>
        ),
        labels: { confirm: "Confirm", cancel: "Cancel" },
        onCancel: () => {},
        onConfirm: () => {
          confirmedOverwrite = true;
          saveEvalCode();
        },
      });
      return;
    } else {
      confirmedOverwrite = false;
    }
    const currentEditorValue = editorContent;
    const postData = {
      code: currentEditorValue,
      filename: fileNameInput,
    };
    const response = await fetch("api/eval/saveFile", {
      method: "POST",
      body: JSON.stringify(postData),
    });
    const responseJson: SaveFileResponseData = await response.json();
    notifications.showNotification(
      addStylingToNotification({
        type: responseJson.status,
        title: "Eval",
        message: responseJson.message ?? (
          <text>
            Successfully saved to <Code>{fileNameInput}</Code>
          </text>
        ),
      })
    );
  }
  async function submitEval() {
    const currentEditorValue = editorContent;
    if (!currentEditorValue) return;
    const postData = {
      code: currentEditorValue,
    };
    const response = await fetch("api/eval/runEval", {
      method: "POST",
      body: JSON.stringify(postData),
    });
    const responseJson: RunEvalResponseData = await response.json();
    notifications.showNotification(
      addStylingToNotification({
        type: responseJson.status,
        title: "Eval",
        message: responseJson.message,
      })
    );
  }
  return (
    <Box>
      <h2>Eval</h2>
      <CodeMirror
        value={editorContent}
        height="200px"
        theme={oneDarkTheme}
        onChange={setEditorContent}
      />
      <form>
        <Group spacing="xs">
          <Autocomplete
            data={evalFileNames?.files ?? []}
            label="File Name"
            {...fileNameForm.getInputProps("filename")}
          />
          <Button
            variant="light"
            color="violet"
            onClick={loadEvalCode}
            sx={{ marginTop: 25 }}
          >
            Load Code
          </Button>
          <Button
            variant="light"
            color="violet"
            onClick={saveEvalCode}
            sx={{ marginTop: 25 }}
          >
            Save Code
          </Button>
          <Button
            onClick={submitEval}
            variant="filled"
            color="green"
            sx={{ marginTop: 25 }}
          >
            Run Eval
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default EvalBox;
