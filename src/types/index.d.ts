export interface IMenuItem {
  id: string;
  name: string;
  isActive: boolean;
}

export interface ITabHook {
  tabList: IMenuItem[];
  currentTabIndex: number;
  currentTabData: IMenuItem;
  onHandleTabActive: (tabId: string) => void;
}
