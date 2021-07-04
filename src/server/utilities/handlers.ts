import { NextApiRequest, NextApiResponse } from "next";
import { ApiFunction, ApiHandler, BuildApiArray, ClientApiFunction,
   Context, PossibleMethods, ServerResponse } from "types/utilities";
import { getSession } from "utilities/auth";
import { get, post } from "utilities/rest";
import { isClient } from "utilities/tools";

export interface BuildApiOptions {
  GET?: ApiFunction;
  POST?: ApiFunction;
  PUT?: ApiFunction;
  PATCH?: ApiFunction;
  DELETE?: ApiFunction;
}

export function buildApi(url: string, options: BuildApiOptions): BuildApiArray {
  return createApiFunctions(url, createEndpoint(options), options);
}

export function createEndpoint(options: BuildApiOptions) {
  const func = async (req: NextApiRequest, res: NextApiResponse) => {
    const method = req.method as PossibleMethods;
    const apiFunction = options[method];
    if (!apiFunction) {
      const response: ServerResponse<any> = { success: false, data: {},
        message: `The method ${method} does not exist for this endpoint.` };
      res.status(405).json(response);
      return;
    }
    const session = getSession({req});
    const ctx = { req, res, session };
    try {
      const input = (method === "GET") ? req.query : req.body;
      const data = await apiFunction(input, ctx);
      const response: ServerResponse<any> = { success: true, data, message: "" };
      res.status(200).json(response);
      return;
    } catch(error) {
      const response: ServerResponse<any> = { success: false, data: {}, message: error.message };
      res.status(error.code).json(response);
      return;
    }
  };
  return func;
}

export function createApiFunctions(url: string, endpoint: ApiHandler, options: BuildApiOptions): BuildApiArray {
  const apiArray: any[] = [ endpoint ];
  for (const item of Object.entries(options)) {
    const method = item[0] as PossibleMethods;
    const func = item[1] as ApiFunction;
    const apiFunction: ClientApiFunction = async (data = {}, ctx) => {
      if (isClient) {
        if (method === "GET") {
          return get(url, data);
        } else {
          return post(url, data, method);
        }
      }

      if ((ctx as Context)?.session) {
        return func(data, ctx as Context);
      } else if (ctx?.req && ctx?.res) {
        const newCtx = { req: ctx.req, res: ctx.res, session: getSession(ctx) } as Context;
        console.log(newCtx);
        return func(data, newCtx);
      }
    };
    apiArray.push(apiFunction);
  }
  return apiArray as BuildApiArray;
}
