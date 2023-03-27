import { useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useCarousel } from "use-carousel-hook";

export function useCustomisedCarousel() {
  const useCarouselHook = useCarousel();

  const handleResize = useDebouncedCallback(() => {
    // reset to the first element, as the carousel containter width changes
    // and positions of elements move
    useCarouselHook.reset();
  }, 100);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.addEventListener("resize", handleResize);
  }, [handleResize]);

  return useCarouselHook;
}
