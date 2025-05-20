import {RequestMethod} from "../types/request.method.type";
import {ContentType} from "../types/content.type";
import {Auth} from "../types/auth.type";
import {RequestBody} from "../types/body.type";
import {FineResponseType} from "../types/fine.response.type";

export interface IRequestParams<T extends FineResponseType> {
    /**
     * URL to send the request
     */
    url: string,
    /**
     * HTTP method for fetch
     */
    method?: RequestMethod,
    /**
     * You can specify the body of the request using a regular Record or any
     */
    body?: RequestBody,
    /**
     * Specify the content type directly in the interface
     */
    contentType?: ContentType | `${string}/${string}`,
    /**
     * Adds "Accept" header to HTTP request
     */
    accept?: ContentType | `${string}/${string}`,
    /**
     * You can specify headers via a paint object
     */
    headers?: Record<string, any>,
    /**
     * The URL will automatically be filled with values from this Record in the form: ...?keyOne=valueOne&keyTwo=valueTwo...
     */
    query?: Record<string, any>,
    /**
     * Maximum response time
     */
    timeout?: number,
    /**
     * Response type (eg text, json or other)
     */
    responseType?: T,
    /**
     * Automatically adds "Authorization" header to HTTP request
     */
    auth?: Auth,
    /**
     * Number of attempts with failures
     */
    retryCount?: number
}