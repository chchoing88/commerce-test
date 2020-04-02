import React, { useEffect, useRef } from "react";
import IScroll from "iscroll";
import { scrollMoveTo } from "utils";

// function useIScroll(id: string, startX: number = 0) {
function useIScroll(
  ref: React.RefObject<HTMLDivElement>,
  currentIndex: number
) {
  const iScroll = useRef<IScroll | null>(null);

  useEffect(() => {
    if (!iScroll.current) {
      // wrapper width
      console.dir(ref.current);

      if (ref.current) {
        const wrapperElement = ref.current;
        const wrapperId = wrapperElement.id;

        const startX = scrollMoveTo(wrapperElement, currentIndex);

        iScroll.current = new IScroll(`#${wrapperId}`, {
          scrollX: true,
          startX,
          scrollY: false,
          disablePointer: true,
          disableTouch: false,
          disableMouse: false,
          preventDefault: false
        });
      }
    }

    return () => {
      if (iScroll.current) {
        iScroll.current.destroy();
      }
    };
  }, [ref, currentIndex]);

  return iScroll.current;
}

export default useIScroll;
