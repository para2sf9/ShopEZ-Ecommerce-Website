import { useState, useEffect } from "react";
import { getImageWithFallback, PLACEHOLDER } from "../utils/images";

export default function ProductImage({ src, alt = "Product", className = "", fallbackText, category = "" }) {
  const [imgSrc, setImgSrc] = useState(() => getImageWithFallback(src, fallbackText || alt, category));
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    setImgSrc(getImageWithFallback(src, fallbackText || alt, category));
    setErrored(false);
  }, [src, alt, fallbackText, category]);

  const handleError = () => {
    setImgSrc(PLACEHOLDER((fallbackText || alt || "Product").slice(0, 18)));
    setErrored(true);
  };

  return (
    <div className="relative w-full h-full bg-gray-50">
      {!errored && <div className="absolute inset-0 shimmer opacity-40" />}
      <img
        src={imgSrc}
        alt={alt}
        loading="lazy"
        referrerPolicy="no-referrer"
        onError={handleError}
        className={`${className} w-full h-full`}
      />
    </div>
  );
}
