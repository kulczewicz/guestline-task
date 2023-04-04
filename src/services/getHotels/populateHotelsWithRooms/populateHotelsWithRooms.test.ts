import * as populate from "../populateHotelsWithRooms";
import * as fetchData from "../../fetchData";
import { describe, expect, it, vi } from "vitest";

import { hotelDetailsMock } from "./__mocks__/hotelDetailsMock";
import { serialisedHotelsMock } from "../fetchHotels/__mocks__/hotelsMock";

const errorMessage = "oops";

vi.mock("../../fetchData", () => {
  return {
    fetchData: vi
      .fn()
      // both return
      .mockImplementationOnce(() => Promise.resolve(hotelDetailsMock))
      .mockImplementationOnce(() => Promise.resolve(hotelDetailsMock))
      // one fails
      .mockImplementationOnce(() => Promise.resolve(hotelDetailsMock))
      .mockImplementationOnce(() => Promise.reject(errorMessage)),
  };
});

describe("populateHotelsWithRooms.test", () => {
  describe("fetchData resolves with hotels array", () => {
    it("resolves", async () => {
      const populatedHotels = await populate.populateHotelsWithRooms(
        serialisedHotelsMock
      );
      expect(fetchData.fetchData).toBeCalledTimes(2);
      expect(populatedHotels.length).toBe(2);
      populatedHotels.forEach(({ rooms, ...hotel }, index) => {
        expect(hotel).toEqual(serialisedHotelsMock[index]);
        expect(rooms).toBeDefined();
        rooms.forEach(
          (
            { id, name, occupancy, longDescription, shortDescription },
            roomIndex
          ) => {
            expect(id).toBe(hotelDetailsMock.rooms[roomIndex].id);
            expect(name).toBe(hotelDetailsMock.rooms[roomIndex].name);
            expect(occupancy).toEqual(
              hotelDetailsMock.rooms[roomIndex].occupancy
            );
            expect(longDescription).toBe(
              hotelDetailsMock.rooms[roomIndex].longDescription
            );
            expect(shortDescription).toBe(
              hotelDetailsMock.rooms[roomIndex].shortDescription
            );
          }
        );
      });
    });
  });

  describe("fetchData rejects with error", () => {
    it("throws error", async () => {
      try {
        await populate.populateHotelsWithRooms(serialisedHotelsMock);
        expect(populate.populateHotelsWithRooms).toThrow(errorMessage);
      } catch (error) {
        expect(error).toBe(errorMessage);
      }
    });
  });
});
