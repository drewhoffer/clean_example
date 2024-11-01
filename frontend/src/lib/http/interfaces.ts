/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosRequestConfig } from "axios";

export type QueryResponse<T> = T;

export interface Http {
	get: <T>(
		url: string,
		config?: AxiosRequestConfig,
	) => Promise<QueryResponse<T>>;
	post: <T>(
		url: string,
		body?: any,
		config?: AxiosRequestConfig,
	) => Promise<QueryResponse<T>>;
	patch: <T>(
		url: string,
		body?: any,
		config?: AxiosRequestConfig,
	) => Promise<QueryResponse<T>>;
	deleteReq: <T>(
		url: string,
		config?: AxiosRequestConfig,
	) => Promise<QueryResponse<T>>;
}

export interface HttpResponse {
	data?: any;
	status: number;
}

export interface HttpResponseError {
	error: {
		message?: string;
	};
	success: boolean;
}

export default HttpResponse;
