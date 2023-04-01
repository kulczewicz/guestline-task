import { CSSProperties, useState } from "react";

type Direction = "prev" | "next";
interface GetNewDirectionParams {
  direction: Direction;
  current: number;
  length: number;
}

function getNewDirection({
  direction,
  current,
  length,
}: GetNewDirectionParams) {
  if (direction === "prev") {
    return current === 0 ? length - 1 : current - 1;
  } else {
    return current >= length - 1 ? 0 : current + 1;
  }
}

const WIDTH_100_PERCENT = 100;
export function useCarousel(length: number) {
  const [current, setCurrent] = useState(0);
  const shift = WIDTH_100_PERCENT * current;
  const style: CSSProperties = {
    transition: `transform 500ms ease`,
    flex: "0 0 auto",
    width: "100%",
    transform: `translateX(-${shift}%)`,
  };

  const navigate = (direction: Direction) => () => {
    const newCurrent = getNewDirection({ direction, current, length });
    setCurrent(newCurrent);
  };

  const prev = navigate("prev");
  const next = navigate("next");

  return { next, prev, style };
}
