// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
export interface RunEvalResponseData {
  message: string;
  type: "success" | "warning" | "error";
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RunEvalResponseData | string>
) {
  if (req.method != "POST") return res.status(405).send("Method not allowed");
  res
    .status(200)
    .json({ message: "Pew pew your code has been run", type: "warning" });
}
