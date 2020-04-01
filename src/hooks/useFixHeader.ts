import { useEffect, useState } from "react";

function useFixHeader() {
  const [isHeaderFix, setHeaderFix] = useState(false);
  const [boundaryPosition, setBoundarayPostion] = useState<number | null>(null);

  useEffect(() => {
    const onScroll = (e: Event) => {
      if (boundaryPosition) {
        if (window.scrollY > boundaryPosition) {
          setHeaderFix(beforeHeaderFix => {
            if (!beforeHeaderFix) {
              return !beforeHeaderFix;
            }
            return beforeHeaderFix;
          });
        } else if (window.scrollY <= boundaryPosition) {
          setHeaderFix(beforeHeaderFix => {
            if (beforeHeaderFix) {
              return !beforeHeaderFix;
            }
            return beforeHeaderFix;
          });
        }
      }
    };
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [boundaryPosition]);

  return { isHeaderFix, boundaryPosition, setBoundarayPostion };
}

export default useFixHeader;
