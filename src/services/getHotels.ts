import type {
  Hotel,
  HotelData,
  HotelResponseData,
  RoomRateResponseData,
} from "../types";

const hotelCollectionUrl =
  "https://obmng.dbm.guestline.net/api/hotels?collection-id=OBMNG";

const getHotelDetailsUrl = (id: string) =>
  `https://obmng.dbm.guestline.net/api/roomRates/OBMNG/${id}`;

async function getData(url: string) {
  let rawResponse: Response;
  try {
    rawResponse = await fetch(url);
  } catch (error) {
    return Promise.reject(String(error));
  }
  if (!rawResponse.ok || !rawResponse.status.toString().startsWith("2")) {
    const error = await rawResponse.text();
    return Promise.reject(error);
  }
  const response = await rawResponse.json();
  return Promise.resolve(response);
}

interface HotelResponse {
  data?: Hotel[];
  error?: string;
}

export async function getHotels(): Promise<HotelResponse> {
  let hotelsResponse: HotelResponseData;
  try {
    hotelsResponse = await getData(hotelCollectionUrl);
  } catch (error) {
    return { error: String(error) };
  }
  if (!Array.isArray(hotelsResponse)) {
    return { error: "Invalid response format" };
  }

  const hotels: HotelData[] = hotelsResponse.map(
    ({ id, name, address1, address2, starRating, images }) => ({
      id,
      name,
      address1,
      address2,
      starRating,
      images,
    })
  );

  let hotelsWithRooms: Hotel[];
  try {
    const roomRates: RoomRateResponseData[] = await Promise.all(
      hotels.map(({ id }) => getData(getHotelDetailsUrl(id)))
    );
    const hotelsWithRooms: Hotel[] = hotels.map((hotel, index) => ({
      ...hotel,
      rooms: roomRates[index].rooms ?? [],
    }));
    return { data: hotelsWithRooms };
  } catch (error) {
    return { error: String(error) };
  }
}
