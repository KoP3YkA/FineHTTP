import {IBaseRequestResult} from "./base.request.result.interface";

export interface IRequestExceptionResult extends IBaseRequestResult {
    /**
     * Is error
     */
    ok: false,
    /**
     * Original error from catch() block
     */
    error: Error
}