import {HeadersAdapter} from "./HeadersAdapter";

export class UrlAdapter {

    public static adaptUrl(url: string, queries?: Record<any, any>) : string {
        if (!queries || HeadersAdapter.keysLength(queries) === 0) return url;
        url += '?';
        Object.keys(queries).forEach((obj) => {
            url += `${obj}=${queries[obj]}`
        })
        return url;
    }

}