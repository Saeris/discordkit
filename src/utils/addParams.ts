import { isNotNullish } from "./isNotNullish";
import { toSnakeCase } from "./toSnakeCase";

export type RequestParams = Partial<Record<string, string | string[] | number | number[] | boolean | null | undefined>>;

export const addParams = <P extends RequestParams>(url: URL, params: P): URL => {
  for (const [key, value] of Object.entries(params)) {
    if (isNotNullish(value)) {
      url.searchParams.set(toSnakeCase(key), value.toString());
    }
  }

  return url;
};
