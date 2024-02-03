import React, { useEffect, useState } from 'react';

const ImageWithFallback = ({ src, fallbackSrc, classes }) => {
    const [imageSrc, setImageSrc] = useState(src);
    useEffect(()=>{
        setImageSrc(src)
    },[src])
 const handleImageError = () => {
    setImageSrc(fallbackSrc);
    }
    return <img src={imageSrc} onError={handleImageError} alt="Fallback Image" className={`${classes}`}/>;
    };
export default ImageWithFallback;