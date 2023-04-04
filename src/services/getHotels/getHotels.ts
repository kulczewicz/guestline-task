import { fetchHotels } from "./fetchHotels";
import { populateHotelsWithRooms } from "./populateHotelsWithRooms";

export async function getHotels() {
  // try {
  try {
    const hotelsData = await fetchHotels();
    const hotelsWithRooms = await populateHotelsWithRooms(hotelsData);
    return { data: hotelsWithRooms };
    // return Promise.reject("blabla");
  } catch (error) {
    return { error: String(error) };
  }
  // } catch (error) {
  //   return { error: String(error) };
  // }
}
