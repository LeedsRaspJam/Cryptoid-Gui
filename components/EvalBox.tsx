import type { NextPage } from "next";
import CodeMirror from "@uiw/react-codemirror";
import { oneDark as oneDarkTheme } from "@codemirror/theme-one-dark";
import { useState, SyntheticEvent } from "react";
import { addStylingToNotification } from "../lib/notifications";
import useSWR from "swr";
import { fetcher } from "../lib/consts";
import type { ListFilesResponseData } from "../pages/api/eval/listFiles";
import {
  Box,
  Grid,
  Autocomplete,
  Button,
  Alert,
  Group,
  Code,
} from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import { SaveFileResponseData } from "../pages/api/eval/saveFile";
import { RunEvalResponseData } from "../pages/api/eval/runEval";
const EvalBox: NextPage = () => {
  const [fileNameInput, setFileNameInput] = useState<string>();
  const [editorContent, setEditorContent] = useState<string>();
  const notifications = useNotifications();
  const { data: evalFileNames }: { data?: ListFilesResponseData } = useSWR(
    "api/eval/listFiles",
    fetcher
  );
  async function loadEvalCode() {
    if (!fileNameInput) return;
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
            <text>
              Successfully loaded <Code>{fileNameInput}</Code>
            </text>
          ),
        })
      );
    }
  }
  async function saveEvalCode() {
    if (!fileNameInput) return;
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
      <h3>Eval</h3>
      <CodeMirror
        value={editorContent}
        height="200px"
        theme={oneDarkTheme}
        onChange={setEditorContent}
      />
      <Group>
        <Autocomplete
          id="evalFilenameInput"
          data={evalFileNames?.files ?? []}
          sx={{ width: 200 }}
          label="File Name"
          onChange={setFileNameInput}
        />
        <Button
          variant="filled"
          color="secondary"
          type="submit"
          onClick={loadEvalCode}
        >
          Load Code
        </Button>
        <Button variant="filled" color="secondary" onClick={saveEvalCode}>
          Save Code
        </Button>
        <Button onClick={submitEval} variant="filled">
          Run Eval
        </Button>
      </Group>
    </Box>
  );
};

export default EvalBox;
