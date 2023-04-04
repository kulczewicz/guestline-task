import { useEffect, useState } from "react";
import { getHotels } from "../services/getHotels";
import { Hotel } from "../types";

function decrementIfNonNegative(number: number) {
  const newNumber = number - 1;
  return newNumber < 0 ? number : newNumber;
}

interface FilterHotelsByRoomsParams {
  hotels: Hotel[];
  adultsNumber: number;
  childrenNumber: number;
}
function filterHotelsByRooms({
  hotels,
  adultsNumber,
  childrenNumber,
}: FilterHotelsByRoomsParams) {
  const currentHotels: Hotel[] = [];
  for (const hotel of hotels) {
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
  return currentHotels;
}

interface FilterHotelsByStarsParams {
  hotels: Hotel[];
  numberOfStars: number;
}
function filterHotelsByStars({
  hotels,
  numberOfStars,
}: FilterHotelsByStarsParams) {
  return hotels.filter((hotel) => parseInt(hotel.starRating) >= numberOfStars);
}

const INITIAL_NUMBER_OF_STARS = 3;
const INITIAL_NUMBER_OF_ADULTS = 2;
const INITIAL_NUMBER_OF_CHILDREN = 0;
export function useHotels() {
  const [allHotels, setAllHotels] = useState<Hotel[]>([]);
  const [hotelsFilteredByRooms, setHotelsFilteredByRooms] = useState<Hotel[]>(
    []
  );
  const [hotelsFilteredByStars, setHotelsFilteredByStars] = useState<Hotel[]>(
    []
  );
  const [filteredHotels, setFilteredHotels] = useState<Hotel[] | null>(null);

  const [numberOfStars, setNumberOfStars] = useState(INITIAL_NUMBER_OF_STARS);
  const [adultsNumber, setAdultsNumber] = useState(INITIAL_NUMBER_OF_ADULTS);
  const [childrenNumber, setChildrenNumber] = useState(
    INITIAL_NUMBER_OF_CHILDREN
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const hotelsFetcher = async () => {
      setLoading(true);
      const { data, error } = await getHotels();
      if (error) {
        setError(String(error));
      } else if (data) {
        const hotelsFilteredByStars = filterHotelsByStars({
          hotels: data,
          numberOfStars,
        });
        const filteredHotels = filterHotelsByRooms({
          hotels: hotelsFilteredByStars,
          adultsNumber,
          childrenNumber,
        });

        setFilteredHotels(filteredHotels);
        setLoading(false);
        setError(null);

        setAllHotels(data);
        const hotelsFilteredByRooms = filterHotelsByRooms({
          hotels: data,
          adultsNumber,
          childrenNumber,
        });
        setHotelsFilteredByStars(hotelsFilteredByStars);
        setHotelsFilteredByRooms(hotelsFilteredByRooms);
      }
    };
    hotelsFetcher();
  }, []);

  const changeNumberOfVisitors =
    (action: "increment" | "decrement", type: "adults" | "children") => () => {
      const setter = type === "adults" ? setAdultsNumber : setChildrenNumber;
      const visitorsNumber = type === "adults" ? adultsNumber : childrenNumber;
      const newNumber =
        action === "increment"
          ? visitorsNumber + 1
          : decrementIfNonNegative(visitorsNumber);
      setter(newNumber);

      const newAdultsNumber = type === "adults" ? newNumber : adultsNumber;
      const newChildrenNumber =
        type === "children" ? newNumber : childrenNumber;
      setFilteredHotels(
        filterHotelsByRooms({
          hotels: hotelsFilteredByStars,
          adultsNumber: newAdultsNumber,
          childrenNumber: newChildrenNumber,
        })
      );
      setHotelsFilteredByRooms(
        filterHotelsByRooms({
          hotels: allHotels,
          adultsNumber: newAdultsNumber,
          childrenNumber: newChildrenNumber,
        })
      );
    };

  const changeNumberOfStars = (newNumberOfStars: number) => {
    setNumberOfStars(newNumberOfStars);
    setFilteredHotels(
      filterHotelsByStars({
        hotels: hotelsFilteredByRooms,
        numberOfStars: newNumberOfStars,
      })
    );
    setHotelsFilteredByStars(
      filterHotelsByStars({
        hotels: allHotels,
        numberOfStars: newNumberOfStars,
      })
    );
  };

  useEffect(() => {
    if (filteredHotels !== null && filteredHotels.length === 0) {
      setError("Unfortunately, no hotels match your criteria");
    } else {
      setError(null);
    }
  }, [filteredHotels]);

  return {
    hotels: filteredHotels,
    error,
    loading,
    adultsNumber,
    childrenNumber,
    changeNumberOfVisitors,
    numberOfStars,
    changeNumberOfStars,
  };
}
