/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosRequestConfig, AxiosResponse } from "axios";

import { Http, QueryResponse } from "./interfaces";

export type HttpErrorHandler = (error: unknown) => void;

export const makeHttp = (
	httpLib: any,
	errorHandler: HttpErrorHandler,
): Http => {
	return {
		get,
		post,
		patch,
		deleteReq,
	};

	async function refreshTokens() {
		await httpLib.post("/auth/refresh");
	}

	// If we make a request and it returns a 401, try and refresh our tokens then try request again
	// if the request still returns a 401, we throw that error
	// if the request doesnt throw we got our data
	// if the request does throw but it isnt a 401 we throw
	async function handleRequest(
		request: () => Promise<AxiosResponse>,
	): Promise<AxiosResponse> {
		try {
			return await request();
		} catch (error: any) {
			if (error?.response?.status === 401) {
				try {
					await refreshTokens();
					return await request();
				} catch (innerError: any) {
					throw errorHandler(innerError);
				}
			}

			throw errorHandler(error);
		}
	}

	async function get<T>(
		url: string,
		config?: AxiosRequestConfig,
	): Promise<QueryResponse<T>> {
		const request = () => httpLib.get(url, config);
		return await (
			await handleRequest(request)
		).data;
	}
	async function post<T>(
		url: string,
		body?: unknown,
		config?: AxiosRequestConfig,
	): Promise<QueryResponse<T>> {
		const request = () => httpLib.post(url, body, config);
		return await (
			await handleRequest(request)
		).data;
	}

	async function patch<T>(
		url: string,
		body?: unknown,
		config?: AxiosRequestConfig,
	): Promise<QueryResponse<T>> {
		const request = () => httpLib.patch(url, body, config);
		return await (
			await handleRequest(request)
		).data;
	}

	async function deleteReq<T>(
		url: string,
		config?: AxiosRequestConfig,
	): Promise<QueryResponse<T>> {
		const request = () => httpLib.delete(url, config);
		return await (
			await handleRequest(request)
		).data;
	}
};
