import fetch from "cross-fetch";
import { PossibleMethods, ServerResponse } from "types/utilities";

// The default request initialization.
const defaultRequestInit: RequestInit = {
  mode: "cors",
  cache: "no-cache",
  credentials: "same-origin",
  headers: {
    "Content-Type": "application/json",
  },
  redirect: "follow",
  referrerPolicy: "no-referrer",
};

/**
 * Converts an object into URI parameters
 * @param data The data object to convert into URI parameters
 */
export function toURLParams(data?: Record<string, string | unknown>): string {
  if (!data) { return ""; }

  let urlParams = "?";
  const keys = Object.keys(data);
  if (keys.length === 0) { return ""; }

  keys.forEach((key: string) => {
    if (data[key] === undefined || data[key] === "") { return; }
    urlParams += `${key}=${data[key]}&`;
  });
  if (urlParams === "?") { return ""; }

  return urlParams;
}

/**
 * Runs a standard get request
 * @param url The url of the API to request
 *  * @param data The data to send through the Get request as URL params
 * @param requestInit  The request instructions
 */
export async function get<T>(
  url: string,
  data?: Record<string, string>,
  requestInit: RequestInit = defaultRequestInit
): Promise<ServerResponse<T>> {
    requestInit.method = "GET";
    const urlParams = toURLParams(data);
    const response = await fetch(url + urlParams, requestInit);
    return response.json(); // parses JSON response into native JavaScript objects
}

/**
 * A standard Post request, sending an object with a specific REST method
 * @param url The url of the API to request
 * @param data The data to send through the Post request
 * @param requestInit  The request instructions
 */
export async function post<T>(
  url: string,
  data: Record<string, unknown>,
  method: PossibleMethods,
  requestInit: RequestInit = defaultRequestInit
): Promise<ServerResponse<T>> {
    requestInit.method = method;
    requestInit.body = JSON.stringify(data);
    const response = await fetch(url, requestInit);
    return response.json(); // parses JSON response into native JavaScript objects
}
