// import React, { createContext, Dispatch, useReducer, useContext } from "react";

// type HistoryContextProviderProps = {
//   children: React.ReactNode;
// };
// export interface IHistoryItem {
//   preItemsCount: number;
//   scrollTop: number;
//   pageName: string;
// }
// export interface IHistoryState {
//   historyList: IHistoryItem[];
//   // currentIndex: number;
// }

// type Action = { type: "PUSH"; historyItem: IHistoryItem } | { type: "POP" };
// export type HistoryDispatch = Dispatch<Action>;

// const HistoryStateContext = createContext<IHistoryState>({
//   historyList: []
//   // currentIndex: -1
// });

// const HistoryDispatchContext = createContext<HistoryDispatch | undefined>(
//   undefined
// );

// function historyReducer(state: IHistoryState, action: Action) {
//   switch (action.type) {
//     case "PUSH":
//       return {
//         ...state,
//         historyList: state.historyList.concat([action.historyItem])
//         // currentIndex: state.currentIndex + 1
//       };
//     case "POP":
//       return {
//         ...state
//         // currentIndex: state.currentIndex < 0 ? -1 : state.currentIndex - 1
//       };
//     default:
//       return state;
//   }
// }

// export function HistoryContextProvider({
//   children
// }: HistoryContextProviderProps) {
//   const [historyState, dispatch] = useReducer(historyReducer, {
//     historyList: []
//     // currentIndex: -1
//   });

//   return (
//     <HistoryDispatchContext.Provider value={dispatch}>
//       <HistoryStateContext.Provider value={historyState}>
//         {children}
//       </HistoryStateContext.Provider>
//     </HistoryDispatchContext.Provider>
//   );
// }

// export function useHistoryState() {
//   const state = useContext(HistoryStateContext);
//   return state;
// }

// export function useHistoryDispatch() {
//   const dispatch = useContext(HistoryDispatchContext);
//   if (!dispatch) throw new Error("HistoryDispatchContext value not found");
//   return dispatch;
// }
