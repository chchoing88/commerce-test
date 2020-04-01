import { useState, useRef, useEffect, useCallback } from "react";

const SLOW = 0.25;
const MIN_POSITION = 0;
const PADDING_TIMEOUT = 500;
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
  const timeId = useRef<number>(0);
  const touchStartTimeStamp = useRef<number>(0);
  const firstTouchPosition = useRef<number>(0);

  const menuItemWidth = containerWidth * (1 / menuCount);
  const menuListWidth = menuItemWidth * menuLength;
  const maxWidth = containerWidth - menuListWidth - RIGHT_PADDING;
  const containerMidPosition = Math.floor(containerWidth / 2);
  const menuItemhalfWidth = Math.floor(menuItemWidth / 2);

  const initDuration = useCallback(
    duration => {
      if (timeId.current) {
        clearTimeout(timeId.current);
      }
      timeId.current = setTimeout(() => {
        setDuration(0);
      }, duration + PADDING_TIMEOUT);
    },
    [setDuration, timeId]
  );

  const onTouchStart = (e: React.TouchEvent) => {
    // console.log("onTouchStart", e.changedTouches);
    console.log("onTouchStart", e.timeStamp);
    touchStartTimeStamp.current = e.timeStamp;
    beforeTranslateX.current = e.changedTouches[0].clientX;
    firstTouchPosition.current = e.changedTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    // console.log("onTouchMove", e.changedTouches);
    let changedClientX = e.changedTouches[0].clientX - beforeTranslateX.current;
    let tempTranslateX = changedClientX + resultTranslateX.current;

    // 더이상 움직일때가 없을때 마우스 move
    if (tempTranslateX > MIN_POSITION || tempTranslateX < maxWidth) {
      changedClientX = changedClientX * SLOW;
    }

    resultTranslateX.current = changedClientX + resultTranslateX.current;
    beforeTranslateX.current = e.changedTouches[0].clientX;
    setTranslateX(resultTranslateX.current);
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    console.log("onTouchEnd", e.timeStamp);
    let duration = scrollDuration;
    let direction =
      firstTouchPosition.current - e.changedTouches[0].clientX > 0
        ? "left"
        : "right";

    let changedClientX = e.changedTouches[0].clientX - beforeTranslateX.current;
    resultTranslateX.current = changedClientX + resultTranslateX.current;

    // 빠르게 움직였을 때
    // 짧은 거리를 빠르게 , 긴거리를 빠르게
    if (e.timeStamp - touchStartTimeStamp.current < 600) {
      duration = e.timeStamp - touchStartTimeStamp.current;
      if (direction === "left") {
        // 우 -> 좌
        resultTranslateX.current =
          resultTranslateX.current -
          firstTouchPosition.current -
          e.changedTouches[0].clientX;
      } else {
        resultTranslateX.current =
          resultTranslateX.current +
          (firstTouchPosition.current - e.changedTouches[0].clientX);
      }
      setDuration(duration);
      setTranslateX(resultTranslateX.current);
    }

    if (resultTranslateX.current > 0) {
      resultTranslateX.current = MIN_POSITION;
      setDuration(duration);
    } else if (resultTranslateX.current < maxWidth) {
      resultTranslateX.current = maxWidth;
      setDuration(duration);
    }

    setTranslateX(resultTranslateX.current);
    beforeTranslateX.current = MIN_POSITION;

    initDuration(duration);
  };

  const moveToByIndex = useCallback(
    (index: number) => {
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
      initDuration(scrollDuration);
    },
    [
      resultTranslateX,
      setTranslateX,
      setDuration,
      initDuration,
      containerMidPosition,
      maxWidth,
      menuItemWidth,
      menuItemhalfWidth,
      scrollDuration
    ]
  );

  useEffect(() => {
    return () => {
      if (timeId.current) {
        clearTimeout(timeId.current);
      }
    };
  }, []);

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
