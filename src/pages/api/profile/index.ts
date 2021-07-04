import { UserLogic } from "server/logic";
import { DocumentReference } from "server/logic/CoreModelLogic";
import { buildApi } from "server/utilities";
import { UserDocument } from "types/documents";
import { Context } from "types/utilities";
import { toFaunaRef } from "utilities/fauna";

/**
 * Gets a single profile for the profile page
 * @param data The Handler class calling this function
 * @param ctx The request to the server
 */
async function _getProfile(data: any, ctx: Context): Promise<any> {
  const myUser = ctx.session.user;

  const user = await UserLogic.fetchUserByUsername(data.username as string, myUser) as UserDocument;
  if (!user) throw { code: 404, message: "The given profile was not found." };
  if (user.recentPlayers) {
    user.recentPlayers = await UserLogic.fetchUsersFromList(user.recentPlayers as DocumentReference[], myUser);
  }

  return user;
}

/**
 * Updates a single profile for the current user
 * @param data The data coming from the client
 * @param ctx The context of the function call including req, res and session
 */
async function _patchProfile(data: any, ctx: Context): Promise<any> {
  const myUser = ctx.session.user;

  data.ref = toFaunaRef({ id: data.id, collection: "users" });
  const user = await UserLogic.updateUser(data, myUser);
  return user;
}

const [ endpoint, getProfile, patchProfile ] = buildApi("/api/profile", {GET: _getProfile, PATCH: _patchProfile});
export { getProfile, patchProfile };
export default endpoint;
