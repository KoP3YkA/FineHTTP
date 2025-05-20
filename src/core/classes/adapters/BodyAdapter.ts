import {RequestBody} from "../../types/body.type";

export class BodyAdapter {

    public static normalizeBody(body?: RequestBody) : BodyInit | undefined {
        if (body === undefined || body === null) {
            return undefined;
        }

        if (
            typeof body === 'string' ||
            body instanceof FormData ||
            body instanceof Blob ||
            body instanceof ArrayBuffer
        ) {
            return body;
        }

        return JSON.stringify(body);
    }

}