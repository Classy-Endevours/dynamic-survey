import React, { useState } from "react";
const LoadImage = ({ src, alt, width, height }) => {
  const [loading, setLoading] = useState(true);
  const onLoad = () => {
    console.log('here')
    setLoading(false)
  }
  return (
    <React.Fragment>
      <img src="./loading.png" style={loading ? { } : {display: "none" }}  alt={alt}
      height={height}
      width={width}/>
      <img
        src={src}
        onLoad={onLoad}
        style={loading ? {display: "none"} : {  }}
        alt={alt}
        height={height}
        width={width}
      />
    </React.Fragment>
  );
};

export default LoadImage;
