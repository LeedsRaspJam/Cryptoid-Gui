import { CpuUsageResponse, MemUsageResponse } from "cryptoid-types";
import { cpu } from "node-os-utils";
import { memoryUsage } from "process";
import { freemem, totalmem } from "os";

export async function getCpuUsage(): Promise<CpuUsageResponse> {
  return {
    cpuCount: 4,
    cpuUsage: await cpu.usage(),
  };
}

export async function getMemUsage(): Promise<MemUsageResponse> {
  return {
    freeMem: String((freemem() / 1024 / 1024).toFixed(2)) + " MB",
    totalMem: String((totalmem() / 1024 / 1024).toFixed(2)) + " MB",
    processMem:
      String((memoryUsage().heapUsed / 1024 / 1024).toFixed(2)) + " MB",
  };
}
