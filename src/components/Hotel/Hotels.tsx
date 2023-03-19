import { Hotel } from "../../types";
import { HotelHeader, HotelHeaderProps } from "./HotelHeader";
import { HotelRoom } from "./HotelRoom/HotelRoom";
import classes from "./hotels.module.css";

interface HotelProps extends Hotel {}
export function Hotel({ rooms, ...headerProps }: HotelProps) {
  return (
    <div className={classes.hotel}>
      <HotelHeader {...headerProps} />
      {Array.isArray(rooms)
        ? rooms?.map((room) => <HotelRoom key={room.id} {...room} />)
        : null}
    </div>
  );
}

interface HotelsProps {
  hotels: Hotel[];
}
export function Hotels({ hotels }: HotelsProps) {
  return (
    <div className={classes.hotels}>
      {hotels.map((hotelProps) => (
        <Hotel key={hotelProps.id} {...hotelProps} />
      ))}
    </div>
  );
}
