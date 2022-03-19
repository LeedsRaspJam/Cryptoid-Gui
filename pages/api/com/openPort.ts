// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export interface OpenComPortResponse {
  response?: string;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<OpenComPortResponse | string>
) {
  if (req.method != "GET")
    return res.status(405).json({ error: "Method not allowed" });

  return res.status(503).json({ error: "Not yet implemented" });
}