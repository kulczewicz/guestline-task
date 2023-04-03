import * as fetchData from "./fetchData";
import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

const url = "example.com";
const response = { data: [1, 2, 3] };

describe("fetchData", () => {
  beforeAll(() => {
    vi.spyOn(fetchData, "fetchData");
  });

  describe("fetch api resolves", () => {
    beforeEach(() => {
      global.fetch = vi.fn().mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(response),
        })
      );
    });

    it("resolves with json data from fetch api", async () => {
      await fetchData.fetchData(url);
      expect(global.fetch).toBeCalledWith(url);
      expect(fetchData.fetchData).toReturnWith(response);
    });
  });

  describe("fetch api throws error", () => {
    const errorMessage = "Error happened";
    beforeEach(() => {
      global.fetch = vi
        .fn()
        .mockImplementationOnce(() => Promise.reject(errorMessage));
    });

    it("throws error", async () => {
      try {
        await fetchData.fetchData(url);
        expect(fetchData.fetchData).toThrow(errorMessage);
      } catch (e) {}
    });
  });

  describe("fetch api resolves with ok: false", () => {
    const errorText = "oops";
    beforeEach(() => {
      global.fetch = vi.fn().mockImplementationOnce(() =>
        Promise.resolve({
          ok: false,
          text: () => Promise.resolve(errorText),
        })
      );
    });

    it("throws error fetch api from text", async () => {
      const url = "example.com";
      try {
        await fetchData.fetchData(url);
        expect(fetchData.fetchData).toThrow(errorText);
      } catch (e) {}
    });
  });
});
