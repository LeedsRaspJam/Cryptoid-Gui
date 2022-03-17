import type { NextPage } from "next";
import Editor from "@monaco-editor/react";
import { Box, Button, Alert, Grid, Typography } from "@mui/material";
import { useRef, useState } from "react";
import type { RunEvalResponseData } from "../pages/api/runEval";
const EvalBox: NextPage = () => {
  const editorRef = useRef();
  const [evalResponse, setEvalResponse] = useState<RunEvalResponseData>();
  // @ts-expect-error
  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }
  async function submitEval() {
    // @ts-expect-error
    const currentEditorValue = editorRef?.current.getValue();
    if (!currentEditorValue) return;
    const postData = {
      code: currentEditorValue,
    };
    const response = await fetch("api/runEval", {
      method: "POST",
      body: JSON.stringify(postData),
    });
    setEvalResponse(await response.json());
  }
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 1 }}>
        Eval Form Thing
      </Typography>
      <Editor
        height="100px"
        width="500px"
        defaultLanguage="javascript"
        defaultValue="// some comment"
        onMount={handleEditorDidMount}
        theme="vs-dark"
      />
      <Grid container justifyContent="center">
        <Grid item>
          <Button onClick={submitEval} sx={{ mb: 1 }}>
            Submit Me
          </Button>
        </Grid>
      </Grid>

      {evalResponse && (
        <Alert severity={evalResponse?.type}>{evalResponse?.message}</Alert>
      )}
    </Box>
  );
};

export default EvalBox;
