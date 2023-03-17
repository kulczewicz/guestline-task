import { Hotel } from "../../../types";
import { StarRating } from "../../Stars";
import classes from "./hotelHeader.module.css";
import { ImageCarousel } from "./ImageCarousel";

export interface HotelHeaderProps extends Omit<Hotel, "rooms"> {}
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
        {Array.isArray(images) ? <ImageCarousel images={images} /> : null}
        <div className={classes.hotelDetails}>
          <h2>{name}</h2>
          <p>{address1}</p>
          <p>{address2}</p>
        </div>
      </div>
      <StarRating numberOfStars={parseInt(starRating)} />
    </div>
  );
}
