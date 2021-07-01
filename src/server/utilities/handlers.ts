import { NextApiRequest, NextApiResponse } from "next";
import { HTTPHandler } from "server/response";

export let MainHTTPHandler: HTTPHandler;

export interface ServerReq {
  handler: HTTPHandler;
  data: any;
}

export interface CreateEndpointOptions {
  GET?: (this: HTTPHandler, req: NextApiRequest) => Promise<void>;
  POST?: (this: HTTPHandler, req: NextApiRequest) => Promise<void>;
  PUT?: (this: HTTPHandler, req: NextApiRequest) => Promise<void>;
  PATCH?: (this: HTTPHandler, req: NextApiRequest) => Promise<void>;
  DELETE?: (this: HTTPHandler, req: NextApiRequest) => Promise<void>;
}

export function createEndpoint (options: CreateEndpointOptions) {
  const func = async (req: NextApiRequest | ServerReq, res?: NextApiResponse) => {
    if (res) {
      const handler = new HTTPHandler(req as NextApiRequest, res);
      handler.GET = options.GET;
      handler.POST = options.POST;
      handler.PUT = options.PUT;
      handler.PATCH = options.PATCH;
      handler.DELETE = options.DELETE;
      MainHTTPHandler = handler;
      await handler.handle();
    } else {
      const { handler, data } = req as ServerReq;
    }
  };
  return func;
}
