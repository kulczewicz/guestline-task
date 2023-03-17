import { HotelHeader, HotelHeaderProps } from "./HotelHeader";
import classes from "./hotels.module.css";

interface HotelProps extends HotelHeaderProps {
  rooms: object[];
}
export function Hotel({ rooms, ...rest }: HotelProps) {
  return (
    <div className={classes.hotels}>
      <HotelHeader {...rest} />
    </div>
  );
}

interface HotelsProps {
  hotels: any[];
}
export function Hotels({ hotels }: HotelsProps) {
  return (
    <div className={classes.hotels}>
      {hotels.map(({ name, address1, address2, starRating, images }) => (
        <Hotel
          key={name}
          rooms={[{}]}
          name={name}
          address1={address1}
          address2={address2}
          starRating={parseInt(starRating)}
          images={images}
        />
      ))}
    </div>
  );
}
