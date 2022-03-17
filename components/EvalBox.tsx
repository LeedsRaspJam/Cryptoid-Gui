import type { NextPage } from "next";
import CodeMirror from "@uiw/react-codemirror";
import { oneDark as oneDarkTheme } from "@codemirror/theme-one-dark";
import {
  Box,
  Button,
  Alert,
  Grid,
  Typography,
  Snackbar,
  Autocomplete,
  TextField,
} from "@mui/material";
import { useState, SyntheticEvent } from "react";
import type { RunEvalResponseData } from "../pages/api/eval/runEval";
import useSWR from "swr";
import { fetcher } from "../lib/consts";
import type { ListFilesResponseData } from "../pages/api/eval/listFiles";
const EvalBox: NextPage = () => {
  const [fileNameInput, setFileNameInput] = useState<string>();
  const [editorContent, setEditorContent] = useState<string>();
  const [evalResponse, setEvalResponse] = useState<RunEvalResponseData>();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { data: evalFileNames }: { data?: ListFilesResponseData } = useSWR(
    "api/eval/listFiles",
    fetcher
  );
  function closeSnackBar(event?: SyntheticEvent | Event, reason?: string) {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  }
  async function loadEvalCode() {
    if (!fileNameInput) return;
    const params = new URLSearchParams();
    params.append("filename", fileNameInput);
    const response = await fetch("api/eval/getFile?" + params);
    if (response.status == 200) {
      const code = (await response.json()).code;
      setEditorContent(code);
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
    setEvalResponse(await response.json());
    setSnackbarOpen(true);
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
    setEvalResponse(await response.json());
    setSnackbarOpen(true);
  }
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 1 }}>
        Eval
      </Typography>
      <CodeMirror
        value={editorContent}
        height="200px"
        theme={oneDarkTheme}
        onChange={(value: string, viewUpdate: unknown) => {
          setEditorContent(value);
        }}
      />
      <Grid container justifyContent="center" sx={{ mt: 2 }} columnSpacing={2}>
        <Grid item>
          <Autocomplete
            id="evalFilenameInput"
            options={evalFileNames?.files ?? []}
            sx={{ width: 200 }}
            renderInput={(params) => (
              <TextField {...params} label="File Name" />
            )}
            onInputChange={(event, newInputValue) => {
              setFileNameInput(newInputValue);
            }}
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            onClick={loadEvalCode}
          >
            Load Code
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" color="secondary" onClick={saveEvalCode}>
            Save Code
          </Button>
        </Grid>
        <Grid item>
          <Button onClick={submitEval} variant="contained">
            Run Eval
          </Button>
        </Grid>
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={closeSnackBar}
      >
        <Alert
          severity={evalResponse?.type}
          variant="filled"
          onClose={closeSnackBar}
        >
          Eval: {evalResponse?.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EvalBox;
