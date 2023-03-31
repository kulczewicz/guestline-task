import { useState, CSSProperties } from "react";

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
export function useCarousel(length: number) {
  const [current, setCurrent] = useState(0);
  const [style, setStyle] = useState<CSSProperties>({
    transition: `transform 400ms ease`,
    flex: "0 0 auto",
    width: "100%",
  });

  const move = (direction: Direction) => () => {
    const newCurrent = getNewDirection({ direction, current, length });
    setCurrent(newCurrent);
    const shift = 100 * newCurrent;
    setStyle((style) => ({ ...style, transform: `translateX(-${shift}%)` }));
  };

  const prev = move("prev");
  const next = move("next");

  return { next, prev, style };
}
