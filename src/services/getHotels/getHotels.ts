import { fetchHotels } from "./fetchHotels";
import { populateHotelsWithRooms } from "./populateHotelsWithRooms";

export async function getHotels() {
  try {
    const hotelsData = await fetchHotels();
    const hotelsWithRooms = await populateHotelsWithRooms(hotelsData);
    return { data: hotelsWithRooms };
  } catch (error) {
    return { error: String(error) };
  }
}
