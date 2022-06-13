import React from "react";
import { Box, Button, Typography } from "@mui/material";
import dragDropImage from "../../images/dragDrop.svg";
import "./Upload.css";

const Upload = (): JSX.Element => {
  return (
    <>
      <Box className="upload-container">
        <Typography className="heading-primary">Upload your image</Typography>
        <Typography className="heading-secondary">
          File should be Jpeg, Png,...
        </Typography>
        <Box className="img-container">
          <img src={dragDropImage} alt="Drag &amp; Drop Here" />
          <Typography className="drag-drop-text">
            Drag &amp; Drop your image here
          </Typography>
        </Box>
        <Typography className="or-text">Or</Typography>
        <Button className="choose-file-button" variant="contained">
          Choose a file
        </Button>
      </Box>
    </>
  );
};

export default Upload;
