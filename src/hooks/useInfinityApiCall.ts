import { useEffect, useState, useRef, useCallback } from "react";
import axios, { CancelToken } from "axios";
// import { useHistoryDispatch, IHistoryItem } from "contexts/HistoryContext";
import { useHistoryStore } from "contexts/HistoryContext";

import { IFakeResponseItem, InfinityFetch } from "types/api";

type useInfinityApiCallProps = {
  apiFetch: InfinityFetch;
  pageName: string;
  isEmptyArray?: boolean;
};

const MAX_ITEMS_COUNT = 200;
const ONE_TIME_COUNT = 30;

const loadData = async (
  apiFetch: InfinityFetch,
  preItemsCount: number,
  itemsCount: number,
  setPList: React.Dispatch<React.SetStateAction<IFakeResponseItem[] | null>>,
  cancelToken?: CancelToken
) => {
  try {
    const response = await apiFetch({
      cancelToken,
      preItemsCount: preItemsCount,
      itemsCount: itemsCount
    });
    // return response;
    console.log("response", response);
    setPList(beforePList => {
      if (!beforePList) {
        beforePList = [];
      }
      return beforePList.concat(response);
    });
  } catch (error) {
    throw new Error(error);
  }

  return true;
};

function useInfinityApiCall({
  apiFetch,
  pageName,
  isEmptyArray = false
}: useInfinityApiCallProps) {
  // const historyDispatch = useHistoryDispatch();
  const historyStore = useHistoryStore();
  console.log("historyStore", historyStore.historyList);

  const [isLoading, setLoading] = useState(false);
  const [pList, setPList] = useState<IFakeResponseItem[] | null>(null);
  const preItemsCount = useRef(0);
  const itemsCount = useRef(30);

  if (historyStore.currentHistory) {
    itemsCount.current = historyStore.currentHistory.preItemsCount;
  }

  // 무한 스크롤
  const infiniteScroll = useCallback(() => {
    const scrollHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    );
    const scrollTop = Math.max(
      document.documentElement.scrollTop,
      document.body.scrollTop
    );
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight === scrollHeight) {
      preItemsCount.current = itemsCount.current;
      itemsCount.current =
        itemsCount.current + ONE_TIME_COUNT > MAX_ITEMS_COUNT
          ? MAX_ITEMS_COUNT
          : itemsCount.current + ONE_TIME_COUNT;

      // console.log("여기", preItemsCount.current);
      if (preItemsCount.current < MAX_ITEMS_COUNT && !isEmptyArray) {
        loadData(apiFetch, preItemsCount.current, itemsCount.current, setPList);
      }
    }
  }, [apiFetch, isEmptyArray]);

  // mount시 api 호출 및 무한 스크롤 이벤트 등록.
  useEffect(() => {
    let source = axios.CancelToken.source();
    setLoading(true);
    if (isEmptyArray) {
      itemsCount.current = 0;
    }

    loadData(
      apiFetch,
      preItemsCount.current,
      itemsCount.current,
      setPList,
      source.token
    ).then(isApiCall => {
      setLoading(false);
      if (historyStore.currentHistory) {
        window.scrollTo(0, historyStore.currentHistory.scrollTop);
      }
    });

    window.addEventListener("scroll", infiniteScroll);

    // unmount 되면서 렌더, dispatch 되면서 렌더.. 2번 렌더..
    return () => {
      console.log(`unmount ${pageName}`);
      source.cancel();
      window.removeEventListener("scroll", infiniteScroll);
      historyStore.pushHistory({
        preItemsCount: itemsCount.current,
        scrollTop: Math.max(
          document.documentElement.scrollTop,
          document.body.scrollTop
        ),
        pageName
      });
      // unmount 시 히스토리 기록 dispatch 실행시 히스토리가 계속 늘어난다. Root에서 참조중..Root 계속 렌더..
      // historyDispatch({
      //   type: "PUSH",
      //   historyItem: {
      //     preItemsCount: itemsCount.current,
      //     scrollTop: Math.max(
      //       document.documentElement.scrollTop,
      //       document.body.scrollTop
      //     ),
      //     pageName
      //   }
      // });
    };
  }, [apiFetch, infiniteScroll, isEmptyArray, historyStore, pageName]);

  return { isLoading, pList };
}

export default useInfinityApiCall;
