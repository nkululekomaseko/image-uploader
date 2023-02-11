import express, { Request, Response } from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import { storage } from "./utils/cloudinary";
import client from "https";
import { createWriteStream } from "fs";
import { cloudinary } from "./utils/cloudinary";
import * as dotenv from "dotenv";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
const upload = multer({ storage });

app.use(express.static(path.join(__dirname, "..", "ui/build")));

const urlToBuffer = async (url: string): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    const data: Uint8Array[] = [];

    client.get(url, (response) => {
      response
        .on("data", (chunk: Uint8Array) => {
          data.push(chunk);
        })
        .on("end", () => {
          resolve(Buffer.concat(data));
        })
        .on("error", (error) => {
          reject(error);
        });
    });
  });
};

app.get(
  "/api/image/unsplash/:filename",
  async (request: Request, response: Response) => {
    try {
      const imageBuffer: Buffer = await urlToBuffer(
        cloudinary.url(`unsplash/${request.params.filename}.jpg`, {
          secure: true,
        })
      );
      response.writeHead(200, { "Content-Type": "image/jpg" });
      response.write(imageBuffer);
      response.end();
    } catch (error) {
      response.status(500).send(error);
    }
  }
);

app.post(
  "/api/image",
  upload.single("file"),
  (request: Request, response: Response) => {
    try {
      if (request.file) {
        console.log(`File: ${JSON.stringify(request.file, null, 2)}`);
        response.status(200).send({
          imageLink: path.join("api", "image", request.file.filename),
        });
      } else {
        response.status(400);
      }
    } catch (error) {
      response.status(500).send(error);
    }
  }
);

app.listen(port, () => {
  console.log(`Listening at port: ${port}`);
});
