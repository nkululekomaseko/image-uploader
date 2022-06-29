import express, { Request, Response } from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import { storage } from "./utils/cloudinary";
import client from "https";
import { createWriteStream } from "fs";
import { cloudinary } from "./utils/cloudinary";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
const upload = multer({ storage });

// app.use("/api/image", express.static(path.join(__dirname, "images")));

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

app.use(express.static(path.join(__dirname, "..", "ui/build")));
const file = createWriteStream("test.jpg");

app.get(
  "/api/image/:filename",
  async (request: Request, response: Response) => {
    try {
      const imageBuffer: Buffer = await urlToBuffer(
        "https://res.cloudinary.com/nkululeko/image/upload/v1656358320/unsplash/bhivfj6styznkftgffgy.jpg"
      );

      // console.log(
      //   `Repsonse from cloudinary: ${JSON.stringify(
      //     imageBuffer.toString("base64"),
      //     null,
      //     2
      //   )}`
      // );
      let filename: string = request.params.filename;
      response.writeHead(200, { "Content-Type": "image/jpg" });
      response.write(imageBuffer);
      response.end();
    } catch (error) {
      response.status(500).send(error);
    }
  }
);

// app.post(
//   "/api/image",
//   upload.single("file"),
//   (request: Request, response: Response) => {
//     try {
//       if (request.file)
//         response.status(200).send({
//           imageLink: path.join("api", "image", request.file.originalname),
//         });
//       else {
//         response.status(400);
//       }
//     } catch (error) {
//       response.status(500).send(error);
//     }
//   }
// );

app.post(
  "/api/image",
  upload.single("file"),
  (request: Request, response: Response) => {
    try {
      if (request.file) {
        console.log(`File: ${JSON.stringify(request.file, null, 2)}`);
        response.status(200).send({
          imageLink: path.join("api", "image", request.file.originalname),
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
