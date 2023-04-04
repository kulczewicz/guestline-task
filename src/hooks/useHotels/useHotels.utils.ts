import { Hotel, ImageEntity } from "../../types";

export function decrementIfNonNegative(number: number) {
  const newNumber = number - 1;
  return newNumber < 0 ? number : newNumber;
}

export function getImagesFromHotels(hotels: Hotel[]) {
  return hotels.reduce((acc, { images }) => {
    if (images) {
      acc.push(...images);
    }
    return acc;
  }, [] as ImageEntity[]);
}

interface FilterHotelsByStarsParams {
  hotels: Hotel[];
  numberOfStars: number;
}
export function filterHotelsByStars({
  hotels,
  numberOfStars,
}: FilterHotelsByStarsParams) {
  return hotels.filter((hotel) => parseInt(hotel.starRating) >= numberOfStars);
}

interface FilterHotelsByRoomsParams {
  hotels: Hotel[];
  adultsNumber: number;
  childrenNumber: number;
}
export function filterHotelsByRooms({
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
