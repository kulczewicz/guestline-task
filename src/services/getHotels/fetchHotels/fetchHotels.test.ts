import * as fetchHotels from "../fetchHotels";
import * as fetchData from "../../fetchData";
import { describe, expect, it, vi } from "vitest";

import { hotelsMock } from "./__mocks__/hotelsMock";

const errorMessage = "oops";

vi.mock("../../fetchData", () => {
  return {
    fetchData: vi
      .fn()
      .mockImplementationOnce(() => Promise.resolve(hotelsMock))
      .mockImplementationOnce(() => Promise.resolve({}))
      .mockImplementationOnce(() => Promise.reject(errorMessage)),
  };
});

describe("fetchHotels", () => {
  describe("fetchData resolves with hotels array", () => {
    it("resolves", async () => {
      const hotelsData = await fetchHotels.fetchHotels();
      expect(fetchData.fetchData).toBeCalledWith(
        fetchHotels.hotelCollectionUrl
      );
      hotelsData.forEach((hotel, index) => {
        expect(hotel.id).toBe(hotelsMock[index].id);
        expect(hotel.address1).toBe(hotelsMock[index].address1);
        expect(hotel.address2).toBe(hotelsMock[index].address2);
        expect(hotel.name).toBe(hotelsMock[index].name);
        expect(hotel.starRating).toBe(hotelsMock[index].starRating);
        hotel.images?.forEach(({ url }, imageIndex) => {
          expect(url).toBe(hotelsMock[index].images[imageIndex].url);
        });
      });
    });
  });

  describe("fetchData resolves not with an array", () => {
    it("throws error", async () => {
      try {
        await fetchHotels.fetchHotels();
        expect(fetchHotels.fetchHotels).toThrow("Invalid response format");
      } catch (e) {}
    });
  });

  describe("fetchData rejects with error", () => {
    it("throw an error from fetchData", async () => {
      try {
        await fetchHotels.fetchHotels();
        expect(fetchHotels.fetchHotels).toThrow(errorMessage);
      } catch (e) {}
    });
  });
});
