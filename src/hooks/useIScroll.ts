import { useEffect, useRef } from "react";
import IScroll from "iscroll";

function useIScroll(id: string) {
  const iScroll = useRef<IScroll>();

  useEffect(() => {
    iScroll.current = new IScroll(id, {
      scrollX: true,
      scrollY: false,
      mouseWheel: false,
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
  }, [id]);

  return iScroll.current;
}

export default useIScroll;
