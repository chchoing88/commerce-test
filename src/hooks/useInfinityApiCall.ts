import { useEffect, useState, useRef, useCallback } from "react";
import axios, { CancelToken } from "axios";
import { useHistoryStore } from "contexts/HistoryContext";

import { IFakeResponseItem, InfinityFetch } from "types/api";

type useInfinityApiCallProps = {
  apiFetch: InfinityFetch;
  pageName: string;
  isEmptyArray?: boolean;
};

const MAX_ITEMS_COUNT = 200;
const ONE_TIME_COUNT = 30;
const BOTTOM_PADDING = 150;

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

    // console.log("response", response);
    if (response) {
      setPList(beforePList => {
        if (!beforePList) {
          beforePList = [];
        }
        return beforePList.concat(response);
      });
      return true;
    }
    return false;
  } catch (error) {
    throw new Error(error);
  }
};

function useInfinityApiCall({
  apiFetch,
  pageName,
  isEmptyArray = false
}: useInfinityApiCallProps) {
  const historyStore = useHistoryStore();
  // console.log("historyStore", historyStore.historyList);

  const [isLoading, setLoading] = useState(false);
  const [pList, setPList] = useState<IFakeResponseItem[] | null>(null);
  const preItemsCount = useRef(0);
  const itemsCount = useRef(30);
  const requestIng = useRef(false);

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

    // console.log("scrollHeight - BOTTOM_PADDING", scrollHeight - BOTTOM_PADDING);
    // console.log("scrollTop + clientHeight", scrollTop + clientHeight);
    if (!requestIng.current) {
      if (scrollTop + clientHeight >= scrollHeight - BOTTOM_PADDING) {
        preItemsCount.current = itemsCount.current;
        itemsCount.current =
          itemsCount.current + ONE_TIME_COUNT > MAX_ITEMS_COUNT
            ? MAX_ITEMS_COUNT
            : itemsCount.current + ONE_TIME_COUNT;

        // console.log("여기", requestIng.current);
        // console.log("preItemsCount.current", preItemsCount.current);

        if (preItemsCount.current < MAX_ITEMS_COUNT && !isEmptyArray) {
          requestIng.current = true;
          loadData(
            apiFetch,
            preItemsCount.current,
            itemsCount.current,
            setPList
          )
            .then(isApiCall => {
              if (isApiCall) {
                requestIng.current = false;
              }
            })
            .catch(e => {
              throw new Error("인피니티 스크롤 loadData 네트워크 오류 입니다.");
            });
        }
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
    )
      .then(isApiCall => {
        // console.log("isApiCall", isApiCall);
        if (isApiCall) {
          setLoading(false);
          if (historyStore.currentHistory) {
            window.scrollTo(0, historyStore.currentHistory.scrollTop);
          }
        }
      })
      .catch(e => {
        throw new Error("초기 loadData 네트워크 오류 입니다.");
      });

    window.addEventListener("scroll", infiniteScroll);

    // unmount
    return () => {
      // console.log(`unmount ${pageName}`);
      window.removeEventListener("scroll", infiniteScroll);
      source.cancel();
      historyStore.pushHistory({
        preItemsCount: itemsCount.current,
        scrollTop: Math.max(
          document.documentElement.scrollTop,
          document.body.scrollTop
        ),
        pageName
      });
    };
  }, [apiFetch, infiniteScroll, isEmptyArray, historyStore, pageName]);

  return { isLoading, pList };
}

export default useInfinityApiCall;
