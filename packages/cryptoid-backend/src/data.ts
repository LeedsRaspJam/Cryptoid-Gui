import { CpuUsageResponse } from "cryptoid-types";
import { cpu } from "node-os-utils";
export async function getCpuUsage(): Promise<CpuUsageResponse> {
  return {
    cpuCount: cpu.count(),
    cpuUsage: await cpu.usage(),
  };
}
