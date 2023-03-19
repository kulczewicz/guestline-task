import { RoomsEntity } from "../../../types";
import classes from "./hotelRoom.module.css";

interface GetDescriptionParams
  extends Pick<RoomsEntity, "shortDescription" | "longDescription"> {}
function getDescription({
  shortDescription,
  longDescription,
}: GetDescriptionParams) {
  if (!shortDescription && !longDescription) {
    return null;
  }
  if (!shortDescription) return longDescription;
  if (!longDescription) return shortDescription;

  return shortDescription.length > longDescription.length
    ? shortDescription
    : longDescription;
}

interface HotelRoomProps extends RoomsEntity {}
export function HotelRoom({
  name,
  occupancy: { maxAdults, maxChildren },
  shortDescription,
  longDescription,
}: HotelRoomProps) {
  return (
    <div className={classes.hotelRoom}>
      <div className={classes.hotelRoomName}>
        <h3>{name}</h3>
        <div>
          <span className={classes.typeOfVisitors}>Adults:</span>{" "}
          <span className={classes.numberOfVisitors}>{maxAdults}</span>
        </div>
        <div>
          <span className={classes.typeOfVisitors}>Children:</span>{" "}
          <span className={classes.numberOfVisitors}>{maxChildren}</span>
        </div>
      </div>

      <div className={classes.hotelRoomDescription}>
        {getDescription({ shortDescription, longDescription })}
      </div>
    </div>
  );
}
