import { apiUrl } from "@/utils/url";
import { getError, makeAxiosApi } from "./axios";
import { makeHttp } from "./http";

const api = makeAxiosApi(apiUrl);

export const http = makeHttp(api, getError);

export default http;
