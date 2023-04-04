import * as getHotels from "../getHotels";
import { describe, expect, it, vi } from "vitest";
import * as fetchHotels from "./fetchHotels";
import * as populateHotels from "./populateHotelsWithRooms";
import { serialisedHotelsMock } from "./fetchHotels/__mocks__/hotelsMock";
import { hotelSerialisedRoomsMock } from "./populateHotelsWithRooms/__mocks__/hotelDetailsMock";

const fetchHotelsError = "fetchHotels error";
const populateHotelsWithRoomsError = "populateHotelsWithRooms error";
vi.mock("./fetchHotels", () => {
  return {
    fetchHotels: vi
      .fn()
      .mockImplementationOnce(() => Promise.resolve(serialisedHotelsMock))
      .mockImplementationOnce(() => Promise.reject(fetchHotelsError))
      .mockImplementationOnce(() => Promise.resolve(serialisedHotelsMock)),
  };
});

const populatedHotels = serialisedHotelsMock.map((hotel) => ({
  ...hotel,
  rooms: hotelSerialisedRoomsMock,
}));

vi.mock("./populateHotelsWithRooms", () => {
  return {
    populateHotelsWithRooms: vi
      .fn()
      .mockImplementationOnce(() => Promise.resolve(populatedHotels))
      .mockImplementationOnce(() =>
        Promise.reject(populateHotelsWithRoomsError)
      ),
  };
});

describe("getHotels", () => {
  it("works properly", async () => {
    const result = await getHotels.getHotels();
    expect(fetchHotels.fetchHotels).toHaveBeenCalledOnce();
    expect(populateHotels.populateHotelsWithRooms).toHaveBeenCalledOnce();
    expect(populateHotels.populateHotelsWithRooms).toBeCalledWith(
      serialisedHotelsMock
    );
    expect(result.data).toEqual(populatedHotels);
  });

  describe("hmm", () => {
    it("fetchHotels throws an error", async () => {
      const { data, error } = await getHotels.getHotels();
      expect(error).toBe(fetchHotelsError);
      expect(data).toBeUndefined();
    });
  });

  describe("hmm", () => {
    it("populateHotelsWithRooms throws an error", async () => {
      const { data, error } = await getHotels.getHotels();
      expect(error).toBe(populateHotelsWithRoomsError);
      expect(data).toBeUndefined();
    });
  });
});
