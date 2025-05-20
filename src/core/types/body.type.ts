/**
 * Union type for allowed body types
 */
export type RequestBody = Record<string, any> | FormData | Blob | string | ArrayBuffer