import { useEffect, useRef } from "react";
import IScroll from "iscroll";

function useIScroll(id: string, startX: number = 0) {
  const iScroll = useRef<IScroll | null>(null);

  useEffect(() => {
    iScroll.current = new IScroll(id, {
      scrollX: true,
      startX,
      scrollY: false,
      disablePointer: true,
      disableTouch: false,
      disableMouse: false,
      preventDefault: false
    });

    return () => {
      if (iScroll.current) {
        iScroll.current.destroy();
      }
    };
  }, [id, startX]);

  return iScroll.current;
}

export default useIScroll;
