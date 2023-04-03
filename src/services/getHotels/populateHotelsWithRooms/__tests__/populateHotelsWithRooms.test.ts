import * as populate from "../populateHotelsWithRooms";
import * as fetchData from "../../../fetchData";
import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  hotelDetailsMock,
  serialisedHotelMock1,
  serialisedHotelMock2,
} from "./hotelDetailsMock";

const errorMessage = "oops";
const serialisedHotels = [serialisedHotelMock1, serialisedHotelMock2];

vi.mock("../../../fetchData", () => {
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
  beforeEach(() => {
    vi.spyOn(populate, "populateHotelsWithRooms");
    vi.spyOn(fetchData, "fetchData");
  });

  describe("fetchData resolves with hotels array", () => {
    it("resolves", async () => {
      const populatedHotels = await populate.populateHotelsWithRooms(
        serialisedHotels
      );
      expect(fetchData.fetchData).toBeCalledTimes(2);
      expect(populatedHotels.length).toBe(2);
      populatedHotels.forEach(({ rooms, ...hotel }, index) => {
        expect(hotel).toEqual(serialisedHotels[index]);
        expect(rooms).toBeDefined();
        rooms.forEach(
          (
            { id, name, occupancy, longDescription, shortDescription },
            roomIndex
          ) => {
            expect(id).toBe(hotelDetailsMock.rooms[roomIndex].id);
            expect(name).toBe(hotelDetailsMock.rooms[roomIndex].name);
            expect(occupancy).toBe(hotelDetailsMock.rooms[roomIndex].occupancy);
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
        await populate.populateHotelsWithRooms(serialisedHotels);
      } catch (error) {
        expect(error).toBe(errorMessage);
      }
    });
  });
});
