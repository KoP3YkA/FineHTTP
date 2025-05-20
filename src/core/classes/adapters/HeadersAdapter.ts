import {IRequestParams} from "../../interfaces/request.params.interface";

export class HeadersAdapter {
    public static keysLength(obj: Record<any, any>) : number {
        return Object.keys(obj).length;
    }

    public static adaptHeader(params: IRequestParams<any>) : Record<string, any> | undefined {
        let headers : Record<string, any> = {};
        if (params.headers && this.keysLength(params.headers) !== 0) headers = {...headers, ...params.headers};
        if (params.contentType) headers = {...headers, 'Content-Type': params.contentType};
        if (params.auth) headers = {...headers, 'Authorization': `${params.auth.type === 'bearer' ? 'Bearer' : 'Basic'} ${params.auth.token}`}
        if (params.accept) headers = {...headers, 'Accept': params.accept}
        if (this.keysLength(headers) !== 0) return headers;
        else return undefined;
    }
}