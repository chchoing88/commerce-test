export interface IMenuItem {
  id: string;
  name: string;
  isActive: boolean;
}

export interface ITabHook {
  tabList: IMenuItem[];
  currentTabData: IMenuItem;
  onHandleTabClick: (tabId: string) => void;
}
