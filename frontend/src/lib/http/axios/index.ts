/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export const getError = (error: any) => {
	if (error.isAxiosError && error.response) {
		return error.response.data.error.message;
	}
	return "Unexpected error";
};

export const makeAxiosApi = (baseUrl: string) => {
	const api = axiosAdapter(baseUrl);

	return {
		get: api.get,
		post: api.post,
		patch: api.patch,
		errorHandler: api.errorHandler,
		deleteReq: api.deleteReq,
	};
};

const axiosAdapter = (baseUrl: string) => {
	const api: AxiosInstance = axios.create({
		baseURL: baseUrl,
		timeout: 30000,
		withCredentials: true,
	});

	function getToken() {
		const token = localStorage.getItem("token");
		if (token) {
			api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
		}
	}

	async function get(
		url: string,
		config?: AxiosRequestConfig,
	): Promise<AxiosResponse> {
		getToken();
		return await api.get(url, config);
	}

	async function post(
		url: string,
		body?: unknown,
		config?: AxiosRequestConfig,
	): Promise<AxiosResponse> {
		getToken();

		return await api.post(url, body, config);
	}

	async function patch(
		url: string,
		body?: unknown,
		config?: AxiosRequestConfig,
	): Promise<AxiosResponse> {
		getToken();

		return await api.patch(url, body, config);
	}
	async function deleteReq(
		url: string,
		config?: AxiosRequestConfig,
	): Promise<AxiosResponse> {
		getToken();

		return await api.delete(url, config);
	}

	// This will need to go into a different class called AxiosErrorAdapter later.
	function handleAxiosErrors(error: unknown) {
		console.error(error);
		// if (axios.isAxiosError(error)) {
		//   if (error.response) {
		//     // The request was made and the server responded with a status code
		//     // that falls out of the range of 2xx
		//     // convert this to HttpResponseError
		//     throw new Error("HTTP RESPONSE ERROR");
		//   } else if (error.request) {
		//     // The request was made but no response was received
		//     // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
		//     // http.ClientRequest in node.js
		//     throw new Error("HTTP REQUEST ERROR");
		//   } else {
		//     // Something happened in setting up the request that triggered an Error
		//     throw new Error("CONFIG ERROR");
		//   }
		// }
		// console.log(error);
		// throw new Error("UNKNOWN ERROR");
	}

	return {
		get,
		post,
		patch,
		errorHandler: handleAxiosErrors,
		deleteReq,
	};
};
