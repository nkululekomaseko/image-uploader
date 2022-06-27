import express, { Request, Response } from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import short from "short-uuid";

dotenv.config();

const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, path.join(__dirname, "images"));
  },
  filename: (request, file, callback) => {
    callback(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

// app.use("/api/image", express.static(path.join(__dirname, "images")));

app.use(express.static(path.join(__dirname, "..", "ui/build")));

app.get("/api/image/:filename", (request: Request, response: Response) => {
  try {
    let filename: string = request.params.filename;
    response.status(200).sendFile(path.join(__dirname, "images", filename));
  } catch (error) {
    response.status(500).send(error);
  }
});

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

let cloudinary_upload_stream = cloudinary.uploader.upload_stream(
  (error, image) => {}
);

app.post(
  "/api/image",
  upload.single("file"),
  (request: Request, response: Response) => {
    try {
      if (request.file) {
        console.log(`Generated: ${short.generate()}`);
        cloudinary.uploader.upload(
          path.join(__dirname, "images", request.file.originalname),
          { folder: "unsplash" },
          (error, image) => {
            if (!!error)
              console.log(`Error: ${JSON.stringify(error, null, 2)}`);
            console.log(`Image: ${JSON.stringify(image, null, 2)}`);
          }
        );
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
