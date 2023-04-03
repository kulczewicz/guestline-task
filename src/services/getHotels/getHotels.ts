import type {
  Hotel,
  HotelData,
  HotelResponseData,
  RoomRateResponseData,
} from "../../types";
import { fetchData } from "../fetchData";
import { fetchHotels } from "./fetchHotels";
import { populateHotelsWithRooms } from "./populateHotelsWithRooms";

export function serializeHotels(hotelsResponse: HotelResponseData[]) {
  return hotelsResponse.map(
    ({ id, name, address1, address2, starRating, images }) =>
      ({
        id,
        name,
        address1,
        address2,
        starRating,
        images,
      } as HotelData)
  );
}

export async function getHotels() {
  try {
    const hotelsData = await fetchHotels();
    const hotelsWithRooms = await populateHotelsWithRooms(hotelsData);
    return { data: hotelsWithRooms };
  } catch (error) {
    return { error: String(error) };
  }
}
