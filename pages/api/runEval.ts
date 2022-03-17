// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
export interface RunEvalResponseData {
  message: string;
  type: "success" | "warning" | "error";
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RunEvalResponseData>
) {
  res.status(200).send({ message: "Pew pew run", type: "success" });
}
