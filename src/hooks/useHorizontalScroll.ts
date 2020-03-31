import { useState, useRef } from "react";

const SLOW = 0.25;
const MIN_POSITION = 0;
const TIMEOUT = 100;
const RIGHT_PADDING = 54;

function useHorizontalScroll(
  menuLength: number,
  containerWidth: number,
  menuCount: number = 5,
  scrollDuration: number = 600
) {
  const [translateX, setTranslateX] = useState(0);
  const [duration, setDuration] = useState(0);
  const beforeTranslateX = useRef<number>(0);
  const resultTranslateX = useRef<number>(0);

  const menuItemWidth = containerWidth * (1 / menuCount);
  const menuListWidth = menuItemWidth * menuLength;
  const maxWidth = containerWidth - menuListWidth - RIGHT_PADDING;
  const containerMidPosition = Math.floor(containerWidth / 2);
  const menuItemhalfWidth = Math.floor(menuItemWidth / 2);

  const onTouchStart = (e: React.TouchEvent) => {
    // console.log("onTouchStart", e.changedTouches);
    beforeTranslateX.current = e.changedTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    // console.log("onTouchMove", e.changedTouches);
    let changedClientX = e.changedTouches[0].clientX - beforeTranslateX.current;
    let tempTranslateX = changedClientX + resultTranslateX.current;

    if (tempTranslateX > MIN_POSITION || tempTranslateX < maxWidth) {
      changedClientX = changedClientX * SLOW;
    }

    resultTranslateX.current = changedClientX + resultTranslateX.current;
    setTranslateX(resultTranslateX.current);
    beforeTranslateX.current = e.changedTouches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    // console.log("onTouchEnd", e.changedTouches);
    if (resultTranslateX.current > 0) {
      resultTranslateX.current = MIN_POSITION;
      setDuration(scrollDuration);
    } else if (resultTranslateX.current < maxWidth) {
      resultTranslateX.current = maxWidth;
      setDuration(scrollDuration);
    }

    setTranslateX(resultTranslateX.current);
    beforeTranslateX.current = MIN_POSITION;

    setTimeout(() => {
      setDuration(0);
    }, scrollDuration + TIMEOUT);
  };

  const moveToByIndex = (index: number) => {
    const currentItemMidPosition = menuItemWidth * index + menuItemhalfWidth;
    let tempTranslateX = containerMidPosition - currentItemMidPosition;

    if (tempTranslateX > 0) {
      tempTranslateX = 0;
    } else if (tempTranslateX < maxWidth) {
      tempTranslateX = maxWidth;
    }
    resultTranslateX.current = tempTranslateX;
    setTranslateX(resultTranslateX.current);
    setDuration(scrollDuration);

    setTimeout(() => {
      setDuration(0);
    }, scrollDuration + TIMEOUT);
  };

  return {
    translateX,
    menuItemWidth,
    menuListWidth,
    duration,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    moveToByIndex
  };
}

export default useHorizontalScroll;
