import { ImageEntity } from "../../../../types";
import classes from "./imageCarousel.module.css";
import { LegacyRef, useEffect, useState } from "react";
import { useCustomisedCarousel } from "../../../../hooks/useCustomisedCarousel";

interface ImageCarouselProps {
  images: ImageEntity[];
}

export function ImageCarousel({ images }: ImageCarouselProps) {
  const { ref, previous, next, reset } = useCustomisedCarousel();

  if (images.length === 0) {
    return null;
  }

  return (
    <div className={classes.carouselWrapper}>
      <button className={classes.carouselLeftButton} onClick={() => previous()}>
        ‹
      </button>
      <button className={classes.carouselRightButton} onClick={() => next()}>
        ›
      </button>
      <ul
        ref={ref as LegacyRef<HTMLUListElement>}
        className={classes.carouselList}
      >
        {images.map(({ url, alt }) => (
          <li key={url} className={classes.carouselItem}>
            <img className={classes.carouselImage} src={url} alt={alt ?? ""} />
          </li>
        ))}
      </ul>
      <div></div>
    </div>
  );
}
