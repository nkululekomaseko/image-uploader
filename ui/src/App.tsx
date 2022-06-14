import React, { useState } from "react";
import Upload from "./components/Upload/Upload";
import ImageLink from "./components/ImageLink/ImageLink";
import LinearProgressBar from "./components/LinearProgressBar/LinearProgressBar";

const App = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);
  const [imageLink, setImageLink] = useState<string | undefined>(undefined);
  return (
    <>
      {!imageLink && !loading && (
        <Upload setLoading={setLoading} setLink={setImageLink} />
      )}
      {loading && <LinearProgressBar />}
      {!!imageLink && !loading && <ImageLink imageLink={imageLink} />}
    </>
  );
};

export default App;
