import {IBaseRequestResult} from "./base.request.result.interface";
import {FineResponseType} from "../types/fine.response.type";
import {ResponseMap} from "../types/response.map.type";

export interface IRequestSuccessResult<T extends FineResponseType> extends IBaseRequestResult {
    ok: true,
    /**
     * Status code
     */
    status: number,
    /**
     * Response from the server
     */
    data: ResponseMap[T],
    /**
     * Headers of response
     */
    headers: Record<string, any>,
    /**
     * The URL the request was sent to (endpoints are not counted)
     */
    fromUrl: string,
    /**
     * Original response
     */
    original: Response
}