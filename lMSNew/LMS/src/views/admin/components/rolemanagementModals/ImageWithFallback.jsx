import React, { useEffect, useState } from "react";
import profileimg90 from "../../../../assets/images/profileimg90.png";
import profileimg from "../../../../assets/images/profileimg.png";

const ImageWithFallback = ({ src, fallbackSrc, classes, setWidth }) => {
  const [imageSrc, setImageSrc] = useState(src);
  useEffect(() => {
    setImageSrc(src);
  }, [src]);
  const handleImageError = () => {
    if (fallbackSrc === "big") {
      setImageSrc(profileimg90);
    } else {
      setImageSrc(profileimg);
    }
  };
  return (
    <img
      src={imageSrc}
      onError={handleImageError}
      alt="Fallback"
      className={`${classes}`}
      style={{ width: "100%" }}
    />
  );
};
export default ImageWithFallback;
