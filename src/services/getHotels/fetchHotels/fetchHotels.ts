import type { HotelData, HotelResponseData } from "../../../types";
import { fetchData } from "../../fetchData";

export const hotelCollectionUrl =
  "https://obmng.dbm.guestline.net/api/hotels?collection-id=OBMNG";

export function serializeHotels({
  id,
  name,
  address1,
  address2,
  starRating,
  images,
}: HotelResponseData): HotelData {
  return {
    id,
    name,
    address1,
    address2,
    starRating,
    images,
  };
}

export async function fetchHotels() {
  try {
    const hotelsResponse = await fetchData<HotelResponseData[]>(
      hotelCollectionUrl
    );

    if (!Array.isArray(hotelsResponse)) {
      return Promise.reject("Invalid response format");
    }
    return Promise.resolve(hotelsResponse.map(serializeHotels));
  } catch (error) {
    return Promise.reject(String(error));
  }
}
