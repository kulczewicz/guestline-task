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
      <div className={classes.hotelHeaderImage}>
        {Array.isArray(images) ? <ImageCarousel images={images} /> : null}
      </div>
      <div className={classes.hotelDetailsAndRating}>
        <div>
          <h2 className={classes.hotelName}>{name}</h2>
          <p className={classes.hotelAddress1}>{address1}</p>
          <p className={classes.hotelAddress2}>{address2}</p>
        </div>
        <StarRating numberOfStars={parseInt(starRating)} />
      </div>
    </div>
  );
}
