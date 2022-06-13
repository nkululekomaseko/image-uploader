import express, { Request, Response } from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import config from "config";

const app = express();
const baseApiUrl = config.get<string>("baseApiUrl");
const port = 5000;

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
// console.log(`Request: ${}`);
const upload = multer({ storage: storage });

app.get("/api/image/:filename", (request: Request, response: Response) => {
  try {
    let filename: string = request.params.filename;
    response.status(200).sendFile(path.join(__dirname, "images", filename));
  } catch (error) {
    response.status(500).send(error);
  }
});

app.post(
  "/api/image",
  upload.single("file"),
  (request: Request, response: Response) => {
    try {
      if (request.file)
        response.status(200).send({
          imageLink: path.join(
            baseApiUrl,
            "api",
            "image",
            request.file.originalname
          ),
        });
      else {
        response.status(400);
      }
    } catch (error) {
      response.status(500).send(error);
    }
  }
);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
