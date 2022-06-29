import { useCallback, useRef, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Button, Input, Typography } from "@mui/material";
import { serverOrigin } from "../..";
import "./Upload.css";

const Upload = (props: {
  setLoading: (update: boolean) => void;
  setLink: (update: string) => void;
}): JSX.Element => {
  const { setLoading, setLink } = props;
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);
    const response = await fetch(`${serverOrigin}/api/image`, {
      method: "POST",
      body: formData,
    });
    if (!!response.body) {
      const data = await response.json();
      setLink(data.imageLink);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!!uploadedFile) {
      handleFileUpload(uploadedFile);
    }
    // eslint-disable-next-line
  }, [uploadedFile]);

  const onDrop = useCallback((files: File[]) => {
    setUploadedFile(files[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/jpeg": [".jpeg", ".png"] },
  });

  const inputFile = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: any) => {
    setUploadedFile(event.target.files[0]);
  };

  return (
    <>
      <Box className="upload-container">
        <Typography className="heading-primary">Upload your image</Typography>
        <Typography className="heading-secondary">
          File should be Jpeg, Png,...
        </Typography>
        <Box {...getRootProps()} className="img-container">
          <input {...getInputProps()} />
          <img src="dragDrop.svg" alt="Drag &amp; Drop Here" />
          <Typography className="drag-drop-text">
            Drag &amp; Drop your image here
          </Typography>
        </Box>
        <Typography className="or-text">Or</Typography>
        <Button
          className="choose-file-button"
          variant="contained"
          component="label"
        >
          Choose a file
          <Input
            type="file"
            ref={inputFile}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </Button>
      </Box>
    </>
  );
};

export default Upload;
