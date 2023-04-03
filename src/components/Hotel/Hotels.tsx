import { useState } from "react";
import type { Hotel, Room, RoomsEntity } from "../../types";
import { HotelHeader } from "./HotelHeader";
import { HotelRoom } from "./HotelRoom/HotelRoom";
import classes from "./hotels.module.css";

interface RoomsInterface {
  rooms: Room[];
}
const numberOfShownRooms = 3;
function Rooms({ rooms }: RoomsInterface) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const showAll = () => {
    setIsCollapsed(false);
  };
  const collapse = () => {
    setIsCollapsed(true);
  };

  return (
    <>
      {(isCollapsed ? rooms.slice(0, numberOfShownRooms) : rooms).map(
        (room) => (
          <HotelRoom key={room.id} {...room} />
        )
      )}
      {rooms.length > numberOfShownRooms ? (
        <div className={classes.showAllContainer}>
          {isCollapsed ? (
            <button
              onClick={showAll}
              className={classes.showAllButton}
              aria-label="Show all rooms"
            >
              Show all ↓
            </button>
          ) : (
            <button
              onClick={collapse}
              className={classes.showAllButton}
              aria-label="Show less rooms"
            >
              Show less ↑
            </button>
          )}
        </div>
      ) : null}
    </>
  );
}

interface HotelProps extends Omit<Hotel, "id"> {}
export function Hotel({
  address1,
  address2,
  name,
  starRating,
  images,
  rooms,
}: HotelProps) {
  return (
    <div className={classes.hotel}>
      <HotelHeader
        name={name}
        address1={address1}
        address2={address2}
        starRating={starRating}
        images={images}
      />
      {Array.isArray(rooms) ? <Rooms rooms={rooms} /> : null}
    </div>
  );
}

interface HotelsProps {
  hotels: Hotel[];
}
export function Hotels({ hotels }: HotelsProps) {
  return (
    <div className={classes.hotels}>
      {hotels.map(({ id, ...hotelProps }) => (
        <div key={id}>
          <Hotel {...hotelProps} />
        </div>
      ))}
    </div>
  );
}
