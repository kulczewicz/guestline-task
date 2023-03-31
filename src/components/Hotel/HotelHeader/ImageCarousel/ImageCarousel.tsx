import { useCarousel } from "../../../../hooks/useCarousel";
import { ImageEntity } from "../../../../types";
import classes from "./imageCarousel.module.css";

interface CarouselProps {
  images: ImageEntity[];
}
export function ImageCarousel({ images }: CarouselProps) {
  const { next, prev, style } = useCarousel(images.length);

  return images.length > 0 ? (
    <div className={classes.carousel}>
      <button className={classes.carouselLeftButton} onClick={() => prev()}>
        ‹
      </button>
      <button className={classes.carouselRightButton} onClick={() => next()}>
        ›
      </button>
      <ul className={classes.carouselContent}>
        {images.map(({ url, alt }) => (
          <li style={style} key={url}>
            <img className={classes.carouselImage} src={url} alt={alt ?? ""} />
          </li>
        ))}
      </ul>
    </div>
  ) : null;
}
