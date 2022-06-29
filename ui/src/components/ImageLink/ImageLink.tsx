import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { CheckCircleSharp } from "@mui/icons-material";
import { serverOrigin } from "../..";
import "./ImageLink.css";

const ImageLink = (props: { imageLink: string }): JSX.Element => {
  const { imageLink } = props;
  console.log(`imageLink: ${!!imageLink}`);

  return (
    <>
      <Box className="image-link-container">
        <CheckCircleSharp style={{ color: "#219653", fontSize: "35px" }} />
        <Typography className="heading">Uploaded Successfully!</Typography>
        <img
          className="uploaded-image"
          src={!!imageLink ? `${serverOrigin}/${imageLink}` : `dragDrop.svg`}
          alt="Uploaded"
        />

        <Box className="link-container">
          <Typography noWrap className="link-text">
            {`${serverOrigin}/${imageLink}`}
          </Typography>
          <Button
            onClick={() =>
              navigator.clipboard.writeText(`${serverOrigin}/${imageLink}`)
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
