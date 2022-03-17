// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { readdir } from "fs/promises";
import { join as joinPath } from "path";
export interface ListFilesResponseData {
  files: Array<string>;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ListFilesResponseData | string>
) {
  if (req.method != "GET") return res.status(405).send("Method not allowed");
  const files = await readdir(
    joinPath(__dirname, "..", "..", "..", "..", "..", "storage", "evalFiles") // TODO: Find a better way of doing this
  );
  const validFiles = files.filter((file) => file.endsWith(".txt"));
  res.status(200).json({ files: validFiles });
}
