import { CpuUsageResponse } from "cryptoid-types";
import { totalmem, freemem } from "os";
export async function getCpuUsage(): Promise<CpuUsageResponse> {
  return { totalMemory: totalmem(), freeMemory: freemem() };
}
