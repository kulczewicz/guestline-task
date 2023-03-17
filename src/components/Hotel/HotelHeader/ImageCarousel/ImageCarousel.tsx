import classes from "./imageCarousel.module.css";

interface ImageCarouselProps {
  images: { url: string; alt?: string }[];
}

export function ImageCarousel({ images }: ImageCarouselProps) {
  if (images.length === 0) {
    return null;
  }
  const [firstImage] = images;
  return (
    <img
      className={classes.imageCarousel}
      src={firstImage.url}
      alt={firstImage.alt ?? ""}
    />
  );
}
