import {IRequestParams} from "./interfaces/request.params.interface";
import {IRequestSuccessResult} from "./interfaces/request.success.result.interface";
import {IRequestExceptionResult} from "./interfaces/request.exception.result.interface";
import {UrlAdapter} from "./classes/adapters/UrlAdapter";
import {HeadersAdapter} from "./classes/adapters/HeadersAdapter";
import {BodyAdapter} from "./classes/adapters/BodyAdapter";
import {FineResponseType} from "./types/fine.response.type";
import {ResponseMap} from "./types/response.map.type";

export class FineHTTP {
    /**
     * The method sends requests without taking into account exceptions. You need to handle them yourself using .catch() or try {} block
     * @param params These are the request settings. For example, URL, method, headers, body, etc.
     * @returns IRequestSuccessResult
     */
    public static async request<T extends FineResponseType>(params: IRequestParams<T>) : Promise<IRequestSuccessResult<T>> {
        const responseType: FineResponseType = params.responseType ?? 'json';
        const retries = params.retryCount ?? 1;

        const fetchOptions: RequestInit = {
            method: params.method ?? 'get',
            headers: HeadersAdapter.adaptHeader(params),
            body: BodyAdapter.normalizeBody(params.body),
        }

        for (let i = 0; i <= retries - 1; i++) {
            const controller = new AbortController();
            const timeout = params.timeout ?? 0;
            let timer: NodeJS.Timeout | undefined;

            try {
                if (timeout > 0) {
                    timer = setTimeout(() => controller.abort(), timeout);
                    fetchOptions.signal = controller.signal;
                }

                const response : Response = await fetch(UrlAdapter.adaptUrl(params.url, params.query), fetchOptions);

                if (timer) clearTimeout(timer);

                let data: unknown;

                switch (responseType) {
                    case 'blob':
                        data = await response.blob();
                        break;
                    case 'text':
                        data = await response.text();
                        break;
                    case 'arrayBuffer':
                        data = await response.arrayBuffer();
                        break;
                    case 'json':
                    default:
                        data = await response.json();
                        break;
                }

                return {
                    ok: true,
                    status: response.status,
                    data: data as ResponseMap[T],
                    headers: Object.fromEntries(response.headers.entries()),
                    fromUrl: params.url,
                    original: response
                }
            } catch (err) {
                if (i === retries - 1) throw err;
            }
        }

        throw new Error('Unhandled exception!')
    }

    /**
     * This method uses the regular request() but handles exceptions itself and returns them to you as an interface
     * @param params These are the request settings. For example, URL, method, headers, body, etc.
     * @returns IRequestSuccessResult or IRequestExceptionResult
     */
    public static async safeRequest<T extends FineResponseType>(params: IRequestParams<T>) : Promise<IRequestSuccessResult<T> | IRequestExceptionResult> {
        try {return await this.request(params);}
        catch (error) {
            return {
                error: error instanceof Error ? error : new Error(String(error)),
                ok: false,
            };
        }
    }

}