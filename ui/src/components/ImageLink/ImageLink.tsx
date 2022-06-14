import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { CheckCircleSharp } from "@mui/icons-material";
import "./ImageLink.css";

const ImageLink = (props: { imageLink: string }): JSX.Element => {
  const { imageLink } = props;

  // TODO - Refactor Base URL hardcoding
  return (
    <>
      <Box className="image-link-container">
        <CheckCircleSharp style={{ color: "#219653", fontSize: "35px" }} />
        <Typography className="heading">Uploaded Successfully!</Typography>
        <img
          className="uploaded-image"
          src={
            !!imageLink
              ? `http://localhost:5000/${imageLink}`
              : "http://localhost:5000/api/image/dragDrop.svg"
          }
          alt="Uploaded"
        />

        <Box className="link-container">
          <Typography noWrap className="link-text">
            {`http://localhost:5000/${imageLink}`}
          </Typography>
          <Button
            onClick={() =>
              navigator.clipboard.writeText(
                `http://localhost:5000/${imageLink}`
              )
            }
            className="copy-link-button"
            variant="contained"
          >
            Copy Link
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default ImageLink;
