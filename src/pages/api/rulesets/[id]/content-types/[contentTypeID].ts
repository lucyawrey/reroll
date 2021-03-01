import { NextApiRequest, NextApiResponse } from "next";
import { ContentTypeResolver } from "../../../../../server";
import HTTPHandler from "../../../../../server/response/Response";

/**
 * Updates a single content type
 * @param this The handler class calling this function
 * @param req The request to update in the server
 */
async function updateContentType(this: HTTPHandler, req: NextApiRequest) {
  const result = await ContentTypeResolver.updateOne(
    req.query.contentTypeID as string,
    req.body
  );
  this.returnSuccess(result);
}

/**
 * Deletes a single content type
 * @param this The handler class calling this function
 * @param req The request to delete in the server
 */
async function deleteContentType(this: HTTPHandler, req: NextApiRequest) {
  console.log("Whutyui")
  const result = await ContentTypeResolver.deleteOne(req.query.contentTypeID as string);
  this.returnSuccess(result);
}

/**
 * Handles the results endpoint
 * @param req The request to the server
 * @param res The result from the server to be sent back
 */
export default async function rulesetsEndpoint(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const handler = new HTTPHandler(req, res);
  handler.PATCH = updateContentType;
  handler.DELETE = deleteContentType;
  await handler.handle();
}
