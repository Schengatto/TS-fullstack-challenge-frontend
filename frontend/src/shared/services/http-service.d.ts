import { RequestInfo } from "shared/utils/request-builder";

export interface HttpService {
    get<T>(requestInfo: RequestInfo): Promise<any>;
    post<T>(requestInfo: RequestInfo): Promise<any>;
    put<T>(requestInfo: RequestInfo): Promise<any>;
    patch<T>(requestInfo: RequestInfo): Promise<any>;
    delete<T>(requestInfo: RequestInfo): Promise<any>;
}
