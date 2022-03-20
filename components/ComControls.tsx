import type { NextPage } from "next";
import { Button } from "@mantine/core";

const ComControls: NextPage = () => {
  async function openComPort() {
    const response = await fetch("api/com/openPort");
  }

  return (
    <Button
      variant="filled"
      color="primary"
      type="submit"
      onClick={openComPort}
    >
      Open Com port
    </Button>
  );
};

export default ComControls;
