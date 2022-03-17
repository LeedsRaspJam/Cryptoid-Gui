// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { cpu } from "node-os-utils";
import { freemem, totalmem } from "os";
import { memoryUsage } from "process";
export interface SystemInfoReturnData {
  cpu: {
    count: number;
    usage: number;
  };
  memory: {
    free: string;
    total: string;
    process: string;
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SystemInfoReturnData>
) {
  res.status(200).json({
    cpu: {
      count: 4,
      usage: await cpu.usage(),
    },
    memory: {
      free: String((freemem() / 1024 / 1024).toFixed(2)) + " MB",
      total: String((totalmem() / 1024 / 1024).toFixed(2)) + " MB",
      process:
        String((memoryUsage().heapUsed / 1024 / 1024).toFixed(2)) + " MB",
    },
  });
}
