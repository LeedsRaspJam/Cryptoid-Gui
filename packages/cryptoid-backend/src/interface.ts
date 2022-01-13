import { totalmem, freemem } from "os";
export async function getCpuUsage() {
    return { totalMemory: totalmem(), freeMemory: freemem() }
}