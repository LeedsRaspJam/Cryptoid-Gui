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
import type { comResponse } from "../pages/api/com/openPort";

const comControls: NextPage = () => {
  function openComPort() {
    const response = fetch("api/com/openPort?");
  }

  return(
    <Button>
        variant="contained"
        color="secondary"
        type="submit"
        onClick={openComPort}
    </Button>
  );
};

export default comControls;