import { useEffect, useState } from "react";
import { Hotel } from "../../types";
import { StarFilter } from "../Stars";
import classes from "./filters.module.css";

function decrementIfNonNegative(number: number) {
  const newNumber = number - 1;
  return newNumber < 0 ? number : newNumber;
}

interface NumberOfVisitorsProps {
  type: "Adults" | "Children";
  number: number;
  increment: () => void;
  decrement: () => void;
}
export function NumberOfVisitors({
  type,
  number,
  increment,
  decrement,
}: NumberOfVisitorsProps) {
  return (
    <div>
      <span className={classes.numberOfVisitorsLabel}>{type}: </span>
      <button className={classes.numberOfVisitorsButton} onClick={increment}>
        +
      </button>
      <span className={classes.numberOfVisitorsLabel}>{number}</span>
      <button className={classes.numberOfVisitorsButton} onClick={decrement}>
        -
      </button>
    </div>
  );
}

interface FiltersProps {
  allHotels: Hotel[];
  setHotels: React.Dispatch<React.SetStateAction<Hotel[]>>;
}
export function Filters({ allHotels, setHotels }: FiltersProps) {
  const [hotelsFilteredByRooms, setHotelsFilteredByRooms] = useState<Hotel[]>(
    []
  );
  const [numberOfStars, setNumberOfStars] = useState(3);

  const [adultsNumber, setAdultsNumber] = useState(2);
  const [childrenNumber, setChildrenNumber] = useState(0);

  const incrementAdults = () => {
    setAdultsNumber((number) => number + 1);
  };
  const decrementAdults = () => {
    setAdultsNumber(decrementIfNonNegative);
  };
  const incrementChildren = () => {
    setChildrenNumber((number) => number + 1);
  };
  const decrementChildren = () => {
    setChildrenNumber(decrementIfNonNegative);
  };

  useEffect(() => {
    const currentHotels: Hotel[] = [];
    for (const hotel of allHotels) {
      const filteredRooms =
        hotel.rooms?.filter(
          (room) =>
            adultsNumber <= room.occupancy.maxAdults &&
            childrenNumber <= room.occupancy.maxChildren
        ) ?? [];

      const newHotel = { ...hotel, rooms: filteredRooms };
      if (filteredRooms.length > 0) {
        currentHotels.push(newHotel);
      }
    }
    setHotelsFilteredByRooms(currentHotels);
  }, [allHotels, adultsNumber, childrenNumber]);

  useEffect(() => {
    const currentHotels = hotelsFilteredByRooms.filter(
      (hotel) => parseInt(hotel.starRating) >= numberOfStars
    );
    setHotels(currentHotels);
  }, [numberOfStars, hotelsFilteredByRooms]);

  return (
    <div className={classes.filtersWrapper}>
      <div className={classes.filters}>
        <StarFilter
          numberOfStars={numberOfStars}
          setNumberOfStars={setNumberOfStars}
        />
        <NumberOfVisitors
          type="Adults"
          number={adultsNumber}
          increment={incrementAdults}
          decrement={decrementAdults}
        />
        <NumberOfVisitors
          type="Children"
          number={childrenNumber}
          increment={incrementChildren}
          decrement={decrementChildren}
        />
      </div>
    </div>
  );
}
