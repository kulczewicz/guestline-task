import { useEffect, useState } from "react";
import { ImageEntity } from "../../types";
import classes from "./header.module.css";

interface HeaderProps {
  allImages: ImageEntity[];
}
export function Header({ allImages }: HeaderProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  useEffect(() => {
    if (allImages.length === 0 || imageSrc !== null) return;
    const max = allImages.length;
    const randomNum = Math.floor(Math.random() * max);
    const image = allImages[randomNum];
    setImageSrc(image.url);
  }, [allImages]);

  return (
    <div className={classes.header}>
      {imageSrc ? (
        <img
          className={classes.headerImage}
          src={imageSrc}
          alt="Header image"
        />
      ) : null}
    </div>
  );
}
