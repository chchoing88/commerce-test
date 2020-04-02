import React, { createContext, useContext } from "react";

import HistoryStore from "staticStore/HistoryStore";

type HistoryContextProviderProps = {
  children: React.ReactNode;
};

const historyStore = new HistoryStore();

const HistoryStateContext = createContext<HistoryStore>(historyStore);

export function HistoryContextProvider({
  children
}: HistoryContextProviderProps) {
  return (
    <HistoryStateContext.Provider value={historyStore}>
      {children}
    </HistoryStateContext.Provider>
  );
}

export function useHistoryStore() {
  const state = useContext(HistoryStateContext);
  return state;
}
