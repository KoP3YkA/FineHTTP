/**
 * Authorization type. Will be replaced to "Authorization": `${type} ${token}`
 */
export type Auth = { type: 'bearer' | 'basic', token: string }