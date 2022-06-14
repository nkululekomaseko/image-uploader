import { Box, Typography, LinearProgress } from "@mui/material";
import "./LinearProgressBar.css";

const LinearProgressBar = () => {
  return (
    <>
      <Box className="progress-container">
        <Typography className="title">Uploading...</Typography>
        <LinearProgress />
      </Box>
    </>
  );
};

export default LinearProgressBar;
