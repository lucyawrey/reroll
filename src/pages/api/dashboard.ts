import { NextApiRequest } from "next";
import { CampaignLogic } from "server/logic";
import { buildApi } from "server/utilities";
import { getMyUser, requireLogin } from "server/auth";

/**
 * Creates a single new ruleset
 * @param this The Handler class calling this function
 * @param req The request to the server
 */
async function _getDashboard(data: any, ctx: Context) {
  const myUser = getMyUser(req);
  requireLogin(myUser);
  const campaigns = await CampaignLogic.fetchMyCampaigns(myUser, { size: 6 });
  this.returnSuccess({ campaigns: campaigns });
}

const [ endpoint, getDashboard ] = buildApi("/api/dashboard", {GET: _getDashboard});
export { getDashboard };
export default endpoint;
