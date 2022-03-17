// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { join as joinPath } from "path";
import { readFile, access } from "fs/promises";
export interface GetFileResponseData {
  code?: string;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetFileResponseData | string>
) {
  if (req.method != "GET")
    return res.status(405).json({ error: "Method not allowed" });
  const fileName = String(req.query.filename);
  // prettier-ignore
  const filePath = joinPath(__dirname, "..", "..", "..", "..", "..", "storage", "evalFiles", fileName);
  try {
    await access(filePath);
  } catch {
    return res.status(404).json({ error: "File not found" });
  }
  try {
    const fileContents = await readFile(filePath, { encoding: "utf8" });
    res.status(200).json({ code: fileContents });
  } catch {
    return res.status(503).json({ error: "Unknown error opening file" });
  }
}
