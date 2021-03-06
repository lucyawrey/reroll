import { NextApiRequest } from "next";
import { HTTPHandler } from "server/response";
import { createEndpoint } from "server/utilities";
import { ImageLogic } from "server/logic";
import { getMyUser, requireLogin } from "server/auth";

/**
 * Creates a single new ruleset
 * @param this The Handler class calling this function
 * @param req The request to the server
 */
async function createExternalImage(this: HTTPHandler, req: NextApiRequest) {
  const myUser = getMyUser(req);
  requireLogin(myUser);
  const image = await ImageLogic.createExternalImage(req.body, myUser);

  this.returnSuccess({ image });
}

export default createEndpoint({PUT: createExternalImage});
