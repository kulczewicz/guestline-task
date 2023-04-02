import { useCarousel } from "../../../../hooks/useCarousel";
import { ImageEntity } from "../../../../types";
import classes from "./imageCarousel.module.css";

interface CarouselProps {
  images: ImageEntity[];
  hotelName: string;
}
export function ImageCarousel({ images, hotelName }: CarouselProps) {
  const { next, prev, style } = useCarousel(images.length);

  return images.length > 0 ? (
    <div className={classes.carousel}>
      <button
        className={classes.carouselLeftButton}
        aria-label="Previous Image"
        onClick={prev}
      >
        ‹
      </button>
      <button
        className={classes.carouselRightButton}
        aria-label="Next Image"
        onClick={next}
      >
        ›
      </button>
      <ul className={classes.carouselContent}>
        {images.map(({ url, alt }) => (
          <li style={style} key={url}>
            <img
              className={classes.carouselImage}
              src={url}
              alt={alt ?? `${hotelName} image nr. 1`}
            />
          </li>
        ))}
      </ul>
    </div>
  ) : null;
}
