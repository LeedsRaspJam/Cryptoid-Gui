// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { writeFile } from "fs/promises";
import { join as joinPath } from "path";
export interface SaveFileResponseData {
  status: "success" | "error";
  message?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SaveFileResponseData | string>
) {
  if (req.method != "POST") return res.status(405).send("Method not allowed");
  const body = JSON.parse(req.body);
  // prettier-ignore
  const filePath = joinPath(__dirname, "..", "..", "..", "..", "..", "storage", "evalFiles", body.filename);
  try {
    await writeFile(filePath, body.code, { encoding: "utf8" });
    res.status(200).json({ status: "success" });
  } catch {
    return res
      .status(503)
      .json({ message: "Unknown error saving file", status: "error" });
  }
}
