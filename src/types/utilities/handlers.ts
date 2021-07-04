import { NextApiRequest, NextApiResponse, NextPageContext } from "next";

export interface ServerResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface ServerError {
  code: number;
  message: string;
}

export interface Context {
  req: NextApiRequest;
  res: NextApiResponse;
  session: any;
}

export type ApiFunction = (data: any, ctx: Context) => Promise<any>;

export type ClientApiFunction = (data?: any, ctx?: Context | NextPageContext) => Promise<any>;

export type ApiHandler = (req: NextApiRequest, res: NextApiResponse) => Promise<void>;

export type BuildApiArray = [ApiHandler, ClientApiFunction, ClientApiFunction,
   ClientApiFunction, ClientApiFunction, ClientApiFunction];

export type PossibleMethods = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
