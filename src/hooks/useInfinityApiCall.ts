import { useEffect, useState, useRef, useCallback } from "react";
import axios, { CancelToken } from "axios";

import { IFakeResponseItem, InfinityFetch } from "types/api";

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

function useInfinityApiCall(
  apiFetch: InfinityFetch,
  isEmptyArray: boolean = false
) {
  const [isLoading, setLoading] = useState(false);
  const [pList, setPList] = useState<IFakeResponseItem[] | null>(null);
  const preItemsCount = useRef(0);
  const itemsCount = useRef(30);

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

      // getFetchData();
      console.log("여기", preItemsCount.current);
      if (preItemsCount.current < MAX_ITEMS_COUNT && !isEmptyArray) {
        loadData(apiFetch, preItemsCount.current, itemsCount.current, setPList);
      }
    }
  }, [apiFetch, isEmptyArray]);

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
    ).then(isApiCall => setLoading(false));

    window.addEventListener("scroll", infiniteScroll);

    return () => {
      source.cancel();
      window.removeEventListener("scroll", infiniteScroll);
    };
  }, [apiFetch, infiniteScroll, isEmptyArray]);

  return { isLoading, pList };
}

export default useInfinityApiCall;
