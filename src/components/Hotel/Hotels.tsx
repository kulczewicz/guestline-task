import { useState } from "react";
import { Hotel, RoomsEntity } from "../../types";
import { HotelHeader, HotelHeaderProps } from "./HotelHeader";
import { HotelRoom } from "./HotelRoom/HotelRoom";
import classes from "./hotels.module.css";

interface RoomsInterface {
  rooms: RoomsEntity[];
}
function Rooms({ rooms: allRooms }: RoomsInterface) {
  const [rooms, setRooms] = useState(allRooms.slice(0, numberOfShownRooms));
  const [isCollapsed, setIsCollapsed] = useState(true);
  const showAll = () => {
    setRooms(allRooms);
    setIsCollapsed(false);
  };
  const collapse = () => {
    setRooms(allRooms.slice(0, numberOfShownRooms));
    setIsCollapsed(true);
  };

  return (
    <>
      {rooms.map((room) => (
        <HotelRoom key={room.id} {...room} />
      ))}
      {allRooms.length > numberOfShownRooms ? (
        <div className={classes.showAllContainer}>
          {isCollapsed ? (
            <button onClick={showAll} className={classes.showAllButton}>
              Show all ↓
            </button>
          ) : (
            <button onClick={collapse} className={classes.showAllButton}>
              Collapse ↑
            </button>
          )}
        </div>
      ) : null}
    </>
  );
}

interface HotelProps extends Hotel {}
const numberOfShownRooms = 3;
export function Hotel({ rooms, ...headerProps }: HotelProps) {
  return (
    <div className={classes.hotel}>
      <HotelHeader {...headerProps} />
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
      {hotels.map((hotelProps) => (
        <Hotel key={hotelProps.id} {...hotelProps} />
      ))}
    </div>
  );
}
