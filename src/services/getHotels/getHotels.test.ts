import * as getHotels from "../getHotels";
import { beforeEach, describe, expect, it, vi } from "vitest";
import * as fetchHotels from "./fetchHotels";
import * as populateHotels from "./populateHotelsWithRooms";

vi.mock("./fetchHotels", () => {
  return {
    fetchHotels: vi.fn().mockImplementationOnce(() => Promise.resolve({})),
  };
});

vi.mock("./populateHotelsWithRooms", () => {
  return {
    populateHotelsWithRooms: vi
      .fn()
      .mockImplementationOnce(() => Promise.resolve({})),
  };
});

describe("getHotels", () => {
  beforeEach(() => {
    vi.spyOn(getHotels, "getHotels");
  });
  it("", () => {});
});
