export type QueryStringParameter = string | number | boolean | Date | (string | number | Date)[] | null | undefined;

export interface RequestInfo {
    url: string;
    headers?: Record<string, string | boolean | number>;
    parameters?: Record<string, QueryStringParameter>;
    payload?: any;
    isAnonymous?: boolean;
}

export class RequestBuilder {
    private _url: string | undefined;
    private _headers: Record<string, string | number | boolean> = {};
    private _params: Record<string, QueryStringParameter> = {};
    private _payload?: any;
    private _isAnonymous?: boolean = false;

    withURL(value: string): RequestBuilder {
        this._url = value;
        return this;
    }

    withHeaders(headers: Record<string, string | number | boolean>): RequestBuilder {
        this._headers = { ...this._headers, ...headers };
        return this;
    }

    withParams(params: Record<string, QueryStringParameter>): RequestBuilder {
        this._params = { ...this._params, ...params };
        return this;
    }

    withPayload(payload: any): RequestBuilder {
        this._payload = payload;
        return this;
    }

    withContentType(contentType: string): RequestBuilder {
        return this.withHeaders({ "Content-Type": contentType });
    }

    withoutAuthentication() {
        this._isAnonymous = true;
        return this;
    }

    build(): RequestInfo {
        if (!this._url) {
            throw new Error("URL is not defined");
        }
        return {
            url: this._url,
            headers: this._headers,
            parameters: this._params,
            payload: this._payload,
            isAnonymous: this._isAnonymous,
        };
    }
}
