import React, { useCallback, useRef, useState, useEffect } from "react";
import Dropzone, { useDropzone } from "react-dropzone";
import { Box, Button, Input, Typography } from "@mui/material";
import dragDropImage from "../../images/dragDrop.svg";
import "./Upload.css";

const Upload = (): JSX.Element => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch("http://localhost:5000/api/image", {
      method: "POST",
      body: formData,
    });
    if (!!response.body) {
      const data = await response.json();
      console.log(`Response from API: ${JSON.stringify(data, null, 2)}`);
    }
  };

  useEffect(() => {
    if (!!uploadedFile) {
      console.log("Sending api...");
      handleFileUpload(uploadedFile);
    }
  }, [uploadedFile]);

  const onDrop = useCallback((files: File[]) => {
    // console.log(`Files: ${JSON.stringify(files, null, 2)}`);
    console.log(URL.createObjectURL(files[0]));
    setUploadedFile(files[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

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
          <img src={dragDropImage} alt="Drag &amp; Drop Here" />
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
