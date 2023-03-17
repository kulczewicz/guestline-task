import { StarRating } from "../../Stars";
import classes from "./hotelHeader.module.css";
import { ImageCarousel } from "./ImageCarousel";

export interface HotelHeaderProps {
  name: string;
  address1: string;
  address2: string;
  starRating: number;
  images: { url: string; alt?: string }[];
}
export function HotelHeader({
  name,
  address1,
  address2,
  starRating,
  images,
}: HotelHeaderProps) {
  return (
    <div className={classes.hotelHeader}>
      <div className={classes.hotelImageAndDetails}>
        <ImageCarousel images={images} />
        <div className={classes.hotelDetails}>
          <h2>{name}</h2>
          <p>{address1}</p>
          <p>{address2}</p>
        </div>
      </div>
      <StarRating numberOfStars={starRating} />
    </div>
  );
}
