import express, { Request, Response } from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import { storage } from "./cloudinary-storage/storage";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
const upload = multer({ storage });

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
