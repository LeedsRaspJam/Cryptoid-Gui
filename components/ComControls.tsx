import type { NextPage } from "next";
import { Button } from "@mui/material";

const ComControls: NextPage = () => {
  async function openComPort() {
    const response = await fetch("api/com/openPort");
  }

  return (
    <Button
      variant="contained"
      color="primary"
      type="submit"
      onClick={openComPort}
    >
      Open Com port
    </Button>
  );
};

export default ComControls;
