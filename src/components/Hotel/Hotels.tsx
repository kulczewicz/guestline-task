import { useState } from "react";
import { Hotel, RoomsEntity } from "../../types";
import { HotelHeader } from "./HotelHeader";
import { HotelRoom } from "./HotelRoom/HotelRoom";
import classes from "./hotels.module.css";
import appClasses from "../../app.module.css";

interface RoomsInterface {
  rooms: RoomsEntity[];
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
      {hotels.length < 1 ? (
        <div className={appClasses.errorEmptyState}>
          Unfortunately, no hotels match your criteria
        </div>
      ) : (
        hotels.map((hotelProps) => (
          <Hotel key={hotelProps.id} {...hotelProps} />
        ))
      )}
    </div>
  );
}
