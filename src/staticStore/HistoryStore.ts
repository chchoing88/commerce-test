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
