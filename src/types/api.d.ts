export interface IFakeResponseItem {
  ID: number;
  Title: string;
  Description: string;
  PageCount: number;
  Excerpt: string;
  PublishDate: string;
}

export interface IInfinityApiFetchProps {
  cancelToken?: CancelToken;
  preItemsCount: number;
  itemsCount: number;
}

export type InfinityFetch = (data: IInfinityApiFetchProps) => AxiosPromise<any>;
