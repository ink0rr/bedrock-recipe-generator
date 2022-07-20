export const decodeBase64 = <T>(data: string) => JSON.parse(atob(data)) as T;

export const encodeBase64 = (data: unknown) => btoa(JSON.stringify(data));
