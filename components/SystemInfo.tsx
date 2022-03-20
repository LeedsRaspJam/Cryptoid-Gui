import { NextPage } from "next";
import useSWR from "swr";
import { Box, Text } from "@mantine/core";
import { fetcher } from "../lib/consts";
import type { SystemInfoReturnData } from "../pages/api/systemInfo";
const SystemInfo: NextPage = () => {
  const { data, error }: { data?: SystemInfoReturnData; error?: any } = useSWR(
    "api/systemInfo",
    fetcher,
    {
      refreshInterval: 5000,
    }
  );
  return (
    <Box>
      <h3>System Info</h3>
      <Text>CPU Usage: {data?.cpu.usage ?? "Loading..."}</Text>
      <h4>Memory</h4>
      <Text>Process Used: {data?.memory.process ?? "Loading..."}</Text>
      <Text>Free: {data?.memory.free ?? "Loading..."}</Text>
      <Text>Total: {data?.memory.total ?? "Loading..."}</Text>
    </Box>
  );
};

export default SystemInfo;
