import { Response } from "express";
import stream from "stream";

export const sendFile = (buffer: Buffer, fileName: string, res: Response) => {
  var readStream = new stream.PassThrough();
  readStream.end(buffer);

  res.set("Content-disposition", "attachment; filename=" + fileName);
  res.set("Content-Type", "binary/octet-stream");

  readStream.pipe(res);
};
