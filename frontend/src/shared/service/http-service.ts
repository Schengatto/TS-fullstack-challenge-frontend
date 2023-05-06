import axios, { AxiosError, AxiosInstance, AxiosResponse, CancelTokenSource, InternalAxiosRequestConfig } from "axios";
import { buildUrlQueryParams, getUrlWithoutQueryParams, isCancelEvent } from "../utils/http";
import { RequestInfo } from "../utils/request-builder";

export interface GetFileResponse {
    fileName: string;
    fileData: Blob;
}

type PendingRequests = Map<string, CancelTokenSource>;
let _pendingRequests: PendingRequests = new Map<string, CancelTokenSource>();

class HttpService {
    axios: AxiosInstance;
    cancelTokenSource?: CancelTokenSource;

    constructor() {
        this.cancelTokenSource = axios.CancelToken.source();
        this.axios = axios.create({
            cancelToken: this.cancelTokenSource.token,
        });

        this.axios.interceptors.request.use(this.onRequestIntercept, this.onRequestError);
        this.axios.interceptors.response.use(this.handleSuccessResponse, this.handleErrorResponse);
        this.axios.defaults.baseURL = process.env.VUE_APP_API_ENDPOINT || "http://localhost:3000";
    }

    static isFailResponse(data: any): boolean {
        return typeof data === "object" && "code" in data && "message" in data;
    }

    set pendingRequests(pendingRequests: Map<string, CancelTokenSource>) {
        _pendingRequests = pendingRequests;
    }

    onRequestIntercept(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
        const tokenSource = axios.CancelToken.source();
        if (config.method === "get" && config.url) {
            const requestUrl = getUrlWithoutQueryParams(config.url);
            const previousRequestCancelTokenSource = _pendingRequests.get(requestUrl);
            if (previousRequestCancelTokenSource) {
                previousRequestCancelTokenSource.cancel();
            }
            _pendingRequests.set(requestUrl, tokenSource);
        }
        return { ...config, data: config.data, cancelToken: tokenSource.token };
    }

    onRequestError(error: any): Promise<any> {
        if (error.name === "CanceledError") return Promise.resolve();
        return Promise.reject(error);
    }

    handleSuccessResponse(res: AxiosResponse) {
        if (res.config.url) {
            _pendingRequests.delete(getUrlWithoutQueryParams(res.config.url));
        }
        if (res.config.responseType === "blob") {
            return res;
        }
        return res;
    }

    async handleErrorResponse(error: AxiosError): Promise<void> {
        if (!isCancelEvent(error) && error.config?.url) {
            _pendingRequests.delete(getUrlWithoutQueryParams(error.config.url));
        }

        if (isCancelEvent(error) || !error.response) {
            return Promise.reject(error);
        }
    }

    cancelPendingRequests(): void {
        this.cancelTokenSource?.cancel();
        this.cancelTokenSource = axios.CancelToken.source();
    }

    onUnhandledrejection(event: any) {
        if (isCancelEvent(event.reason)) {
            event.preventDefault();
        }
    }

    async get<T>(requestInfo: RequestInfo): Promise<AxiosResponse<T>> {
        const { parameters, url, headers } = requestInfo;
        return await this.axios.get<T>(`${url}${buildUrlQueryParams(parameters || {})}`, { headers: headers });
    }

    async post<TResponse = void>(requestInfo: RequestInfo): Promise<AxiosResponse<TResponse>> {
        const { parameters, url, payload, headers } = requestInfo;
        return await this.axios.post<TResponse>(`${url}${buildUrlQueryParams(parameters || {})}`, payload, {
            headers: headers,
        });
    }

    async put<TResponse = void>(requestInfo: RequestInfo): Promise<AxiosResponse<TResponse>> {
        const { parameters, payload, url, headers } = requestInfo;
        return await this.axios.put<TResponse>(`${url}${buildUrlQueryParams(parameters || {})}`, payload, {
            headers: headers,
        });
    }

    async delete<TResponse = void>(requestInfo: RequestInfo): Promise<AxiosResponse<TResponse>> {
        const { parameters, url, headers } = requestInfo;
        return await this.axios.delete<TResponse>(`${url}${buildUrlQueryParams(parameters || {})}`, {
            headers: headers,
        });
    }
}

const httServiceInstance = new HttpService();
export default httServiceInstance;
