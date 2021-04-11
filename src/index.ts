import cors from "cors";
import express from "express";
import multer from "multer";
import schematic2schem from "schematic2schem";
import struct2schem from "struct2schem";
import SchematicType, { getSchematicType } from "./enums/schematic-type";
import { sendFile } from "./utils/send-file";

const app = express();
const upload = multer({ storage: multer.memoryStorage() });
const port = process.env.PORT || 3000;

app.use(cors());

app.get("/", (_, res) => {
  res.send("service is healthy");
});

app.post("/", upload.single("file"), async (req, res) => {
  const fileName = req.file.originalname;
  const extension = fileName.split(".").pop();
  if (!extension) {
    res.status(400);
    return res.json({
      status: 400,
      message: "Could not determine file type from extension.",
    });
  }

  const type = getSchematicType(extension);
  try {
    switch (type) {
      case SchematicType.SPONGE: {
        res.status(400);
        return res.json({
          status: 400,
          message: "Cannot convert file to .schem: file is already .schem.",
        });
      }
      case SchematicType.MCEDIT: {
        const schemBuffer = await schematic2schem(req.file.buffer);
        const newFileName =
          fileName.split(".").slice(0, -1).join(".") + ".schem";
        return sendFile(schemBuffer, newFileName, res);
      }
      case SchematicType.STRUCTURE: {
        const schemBuffer = await struct2schem(req.file.buffer);
        const newFileName =
          fileName.split(".").slice(0, -1).join(".") + ".schem";
        return sendFile(schemBuffer, newFileName, res);
      }
    }
  } catch (err) {
    res.status(500);
    return res.json({
      status: 500,
      message: `Failed to convert file: '${err.message}'`,
    });
  }
});

app.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});
