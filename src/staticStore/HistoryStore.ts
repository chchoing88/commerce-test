export interface IHistoryItem {
  preItemsCount: number;
  scrollTop: number;
  pageName: string;
}

class HistoryStore {
  historyList: IHistoryItem[];
  currentIndex: number;

  constructor() {
    this.historyList = [];
    this.currentIndex = -1;
  }

  get currentHistory() {
    if (this.currentIndex < 0) {
      return null;
    }
    return this.historyList[this.currentIndex - 1];
  }

  getRecentPageHistory(pageName: string) {
    const matchPageNameHistoryList = this.historyList.filter(
      history => history.pageName === pageName
    );
    if (matchPageNameHistoryList.length > -1) {
      return matchPageNameHistoryList[matchPageNameHistoryList.length - 1];
    }

    return null;
  }

  isMatchPageNameHistory(pageName: string) {
    return this.historyList.some(history => history.pageName === pageName);
  }

  pushHistory(historyItem: IHistoryItem) {
    this.historyList.push(historyItem);
    this.currentIndex = this.currentIndex + 1;
  }

  // popHistory() {
  //   const lastHistory = this.historyList.pop();
  //   if (!lastHistory) {
  //     return null;
  //   }
  //   return lastHistory;
  // }
}

export default HistoryStore;
