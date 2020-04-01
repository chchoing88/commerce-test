import { useState, useMemo, useCallback } from "react";
// import {MenuItem} from 'constant'
import { IMenuItem, ITabHook } from "types";

const MENU_LIST: IMenuItem[] = [
  {
    id: "dress",
    name: "DRESS",
    isActive: true
  },
  {
    id: "top",
    name: "TOP",
    isActive: false
  },
  {
    id: "outer",
    name: "OUTER",
    isActive: false
  },
  {
    id: "bottom",
    name: "BOTTOM",
    isActive: false
  },
  {
    id: "shoes",
    name: "SHOES",
    isActive: false
  },
  {
    id: "bags",
    name: "BAGS",
    isActive: false
  },
  {
    id: "accessories",
    name: "ACCESSORIES",
    isActive: false
  },
  {
    id: "jewelry",
    name: "JEWELRY",
    isActive: false
  },
  {
    id: "etc",
    name: "ETC.",
    isActive: false
  },
  {
    id: "man",
    name: "MAN",
    isActive: false
  }
];

function useTab(): ITabHook {
  const [tabList, setTabList] = useState(MENU_LIST);

  const currentTabIndex = useMemo(() => {
    return tabList.findIndex(tabData => tabData.isActive);
  }, [tabList]);

  const currentTabData = useMemo(() => {
    return tabList[currentTabIndex];
  }, [currentTabIndex, tabList]);

  // 탭 눌렀을때
  const onHandleTabActive = useCallback(
    (tabId: string) => {
      if (currentTabData && currentTabData.id !== tabId) {
        setTabList(beforeTabList => {
          return beforeTabList.map(tabItem => {
            tabItem.isActive = tabItem.id === tabId;
            return tabItem;
          });
        });
      }
    },
    [currentTabData]
  );

  return {
    tabList,
    currentTabIndex,
    currentTabData,
    onHandleTabActive
  };
}

export default useTab;
