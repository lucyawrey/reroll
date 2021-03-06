import { NextApiRequest } from "next";
import { HTTPHandler } from "server/response";
import { CampaignLogic } from "server/logic";
import { createEndpoint } from "server/utilities";
import { getMyUser, requireLogin } from "server/auth";

/**
 * Creates a single new ruleset
 * @param this The Handler class calling this function
 * @param req The request to the server
 */
async function getDashboardPage(this: HTTPHandler, req: NextApiRequest) {
  const myUser = getMyUser(req);
  requireLogin(myUser);
  const campaigns = await CampaignLogic.fetchMyCampaigns(myUser, { size: 6 });
  this.returnSuccess({ campaigns: campaigns });
}

export default createEndpoint({GET: getDashboardPage});
