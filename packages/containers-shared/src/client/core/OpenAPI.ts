/* istanbul ignore file */
/* tslint:disable */
import type { ApiRequestOptions } from "./ApiRequestOptions";

type Resolver<T> = (options: ApiRequestOptions) => Promise<T>;
type Headers = Record<string, string>;

export type OpenAPIConfig = {
	BASE: string;
	VERSION: string;
	WITH_CREDENTIALS: boolean;
	CREDENTIALS: "include" | "omit" | "same-origin";
	TOKEN?: string | Resolver<string>;
	USERNAME?: string | Resolver<string>;
	PASSWORD?: string | Resolver<string>;
	HEADERS?: Headers | Resolver<Headers>;
	ENCODE_PATH?: (path: string) => string;
};

export const OpenAPI: OpenAPIConfig = {
	BASE: "",
	VERSION: "1.0.0",
	WITH_CREDENTIALS: false,
	CREDENTIALS: "include",
	TOKEN: undefined,
	USERNAME: undefined,
	PASSWORD: undefined,
	HEADERS: undefined,
	ENCODE_PATH: undefined,
};
