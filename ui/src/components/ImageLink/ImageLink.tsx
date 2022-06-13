import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { CheckCircleSharp } from "@mui/icons-material";
import dragDropImage from "../../images/dragDrop.svg";
import "./ImageLink.css";

const ImageLink = (props: { imageLink: string }): JSX.Element => {
  return (
    <>
      <Box className="image-link-container">
        <CheckCircleSharp style={{ color: "#219653", fontSize: "35px" }} />
        <Typography className="heading">Uploaded Successfully!</Typography>
        <img src={props.imageLink} alt="Uploaded" />
        <Box className="link-container">
          <Typography noWrap className="link-text">
            {props.imageLink}
          </Typography>
          <Button className="copy-link-button" variant="contained">
            Copy Link
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default ImageLink;
