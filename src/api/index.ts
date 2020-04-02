import axios, { AxiosRequestConfig } from "axios";
import { IInfinityApiFetchProps } from "types/api";

const DOMAIN = `http://fakerestapi.azurewebsites.net`;

const request = ({ method, url, data, cancelToken }: AxiosRequestConfig) => {
  return axios({
    method,
    url: DOMAIN + url,
    data,
    cancelToken
  });
};

export const fakeApi = {
  fetch({ cancelToken, preItemsCount, itemsCount }: IInfinityApiFetchProps) {
    return request({
      method: "GET",
      url: "/api/Books",
      cancelToken
    })
      .then(response => {
        return response.data.slice(preItemsCount, itemsCount);
      })
      .catch(error => {
        if (axios.isCancel(error)) {
          console.log("취소");
        }
        throw new Error("네트워크 에러 입니다.");
      });
  }
};
