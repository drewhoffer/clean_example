/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosRequestConfig, AxiosResponse } from "axios";

import { Http, QueryResponse } from "./interfaces";

export type HttpErrorHandler = (error: unknown) => void;

export const makeHttp = (
  httpLib: any,
  errorHandler: HttpErrorHandler
): Http => {
  return {
    get,
    post,
    patch,
    deleteReq,
  };

  async function handleRequest(
    request: () => Promise<AxiosResponse>
  ): Promise<AxiosResponse> {
    try {
      return await request();
    } catch (error: any) {
      console.log(error);
      throw errorHandler(error);
    }
  }

  async function get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<QueryResponse<T>> {
    const request = () => httpLib.get(url, config);
    return await (
      await handleRequest(request)
    ).data;
  }
  async function post<T>(
    url: string,
    body?: unknown,
    config?: AxiosRequestConfig
  ): Promise<QueryResponse<T>> {
    const request = () => httpLib.post(url, body, config);
    return await (
      await handleRequest(request)
    ).data;
  }

  async function patch<T>(
    url: string,
    body?: unknown,
    config?: AxiosRequestConfig
  ): Promise<QueryResponse<T>> {
    const request = () => httpLib.patch(url, body, config);
    return await (
      await handleRequest(request)
    ).data;
  }

  async function deleteReq<T>(
    url: string,
    body?: unknown,
    config?: AxiosRequestConfig
  ): Promise<QueryResponse<T>> {
    const request = () => httpLib.deleteReq(url, body, config);
    return await (
      await handleRequest(request)
    ).data;
  }
};
