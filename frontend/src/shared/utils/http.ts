import { QueryStringParameter } from "./request-builder";
import { parseDateToString } from "./date-utils";

const cancelProperty = "__CANCEL__";

export function getItemStringValue(item: any): string {
    return item instanceof Date ? parseDateToString(item) : String(item);
}

/**
 * Return the query string value of the filter value provided as input.
 * @param value
 */
export function toQueryStringValue(value: any): string {
    return Array.isArray(value) ? String(value.map((i) => getItemStringValue(i))) : getItemStringValue(value);
}

/**
 * Return query params string. If the baseUrl is provided then this method returns the url
 * of the request comprehensive of the query params provided as input.
 * @param params
 * @param baseUrl
 */
export function buildUrlQueryParams(params: Record<string, QueryStringParameter>, baseUrl = ""): string {
    const isNotArrayOrArrayWithElements = (field: string) =>
        !Array.isArray(params[field]) || (Array.isArray(params[field]) && (params[field] as any[]).length);
    const isFieldValued = (field: string) =>
        params[field] !== null && params[field] !== undefined && params[field] !== "";
    return Object.keys(params)
        .filter((k) => isFieldValued(k) && isNotArrayOrArrayWithElements(k))
        .reduce(
            (acc, cur, index) =>
                acc.concat(`${index === 0 ? "?" : "&"}${cur}=${encodeURIComponent(toQueryStringValue(params[cur]!))}`),
            `${baseUrl}`
        );
}

/**
 * Return the baseUrl without the query parameters from the requestUrl provided as input.
 * @param requestUrl
 */
export function getUrlWithoutQueryParams(requestUrl: string): string {
    return requestUrl.indexOf("?") > -1 ? requestUrl.substr(0, requestUrl.indexOf("?")) : requestUrl;
}

/**
 * Return true if the event is related to a cancelled http request.
 * @param event
 */
export function isCancelEvent(event: object): boolean {
    const proto = Object.getPrototypeOf(event);
    return proto[cancelProperty];
}
