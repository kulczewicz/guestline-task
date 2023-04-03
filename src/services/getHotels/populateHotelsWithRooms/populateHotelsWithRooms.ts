import {
  Hotel,
  HotelData,
  Room,
  RoomRateResponseData,
  RoomsEntity,
} from "../../../types";
import { fetchData } from "../../fetchData";

export const getHotelDetailsUrl = (id: string) =>
  `https://obmng.dbm.guestline.net/api/roomRates/OBMNG/${id}`;

function serialiseHotelRoom({
  id,
  name,
  occupancy,
  longDescription,
  shortDescription,
}: RoomsEntity): Room {
  return {
    id,
    name,
    occupancy,
    longDescription,
    shortDescription,
  };
}

export async function populateHotelsWithRooms(hotels: HotelData[]) {
  try {
    const roomRates = await Promise.all(
      hotels.map(({ id }) =>
        fetchData<RoomRateResponseData>(getHotelDetailsUrl(id))
      )
    );
    const hotelsWithRooms: Hotel[] = hotels.map((hotel, index) => ({
      ...hotel,
      rooms: (roomRates[index].rooms ?? []).map(serialiseHotelRoom),
    }));
    return Promise.resolve(hotelsWithRooms);
  } catch (error) {
    return Promise.reject(String(error));
  }
}
