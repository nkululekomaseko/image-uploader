import React, { useEffect, useState } from "react";
import { Alert, Box, Button, Snackbar, Typography } from "@mui/material";
import { CheckCircleSharp } from "@mui/icons-material";
import { serverOrigin } from "../..";
import "./ImageLink.css";

const ImageLink = (props: { imageLink: string }): JSX.Element => {
  const { imageLink } = props;

  useEffect(() => {
    console.log("Image Link: ", imageLink);
    console.log("Link to be copied: ", `${serverOrigin}/${imageLink}`);
  }, [imageLink]);

  const [openSuccessAlert, setOpenSuccessAlert] = useState<boolean>(false);

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
            onClick={() => {
              setOpenSuccessAlert(true);
              navigator.clipboard.writeText(`${serverOrigin}/${imageLink}`);
            }}
            className="copy-link-button"
            variant="contained"
          >
            Copy Link
          </Button>
          <Snackbar
            anchorOrigin={{ horizontal: "right", vertical: "top" }}
            open={openSuccessAlert}
            onClose={() => setOpenSuccessAlert(false)}
            autoHideDuration={3000}
          >
            <Alert
              onClose={() => setOpenSuccessAlert(false)}
              severity="success"
              sx={{ width: "100%" }}
            >
              Linked Copied to Clipboard
            </Alert>
          </Snackbar>
        </Box>
      </Box>
    </>
  );
};

export default ImageLink;
