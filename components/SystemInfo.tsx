import { Box, Typography } from "@mui/material";
import { NextPage } from "next";
import useSWR from "swr";
import { fetcher } from "../lib/consts";
import type { SystemInfoReturnData } from "../pages/api/systemInfo";
const SystemInfo: NextPage = () => {
  const { data, error } = useSWR("api/systemInfo", fetcher, {
    refreshInterval: 5000,
  });
  return (
    <Box>
      <Typography variant="h5">System Info</Typography>
      <Typography>CPU Usage: {data?.cpu.usage ?? "Loading..."}</Typography>
      <Typography variant="h6">Memory</Typography>
      <Typography>
        Process Used: {data?.memory.process ?? "Loading..."}
      </Typography>
      <Typography>Free: {data?.memory.free ?? "Loading..."}</Typography>
      <Typography>Total: {data?.memory.total ?? "Loading..."}</Typography>
    </Box>
  );
};

export default SystemInfo;
