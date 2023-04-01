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

async function fetchData<T>(url: string) {
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
  const response: T = await rawResponse.json();
  return Promise.resolve(response);
}

async function fetchHotels() {
  try {
    const hotelsResponse = await fetchData<HotelResponseData[]>(
      hotelCollectionUrl
    );

    if (!Array.isArray(hotelsResponse)) {
      return Promise.reject("Invalid response format");
    }
    return Promise.resolve(hotelsResponse);
  } catch (error) {
    return Promise.reject(String(error));
  }
}

function serializeHotels(hotelsResponse: HotelResponseData[]) {
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

async function populateHotelsWithRooms(hotels: HotelData[]) {
  try {
    const roomRates = await Promise.all(
      hotels.map(({ id }) =>
        fetchData<RoomRateResponseData>(getHotelDetailsUrl(id))
      )
    );
    const hotelsWithRooms: Hotel[] = hotels.map((hotel, index) => ({
      ...hotel,
      rooms: roomRates[index].rooms ?? [],
    }));
    return Promise.resolve(hotelsWithRooms);
  } catch (error) {
    return Promise.reject(String(error));
  }
}

export async function getHotels() {
  try {
    const hotelsResponseData = await fetchHotels();
    const hotelsData = serializeHotels(hotelsResponseData);
    const hotelsWithRooms = await populateHotelsWithRooms(hotelsData);
    return { data: hotelsWithRooms };
  } catch (error) {
    return { error: String(error) };
  }
}
