import { requireLogin } from "server/auth";
import { UserLogic } from "server/logic";
import { buildApi } from "server/utilities";
import { Context } from "types/utilities";

/**
 * Updates a single profile image for the current user
 * @param this The handler class calling this function
 * @param req The request to the server
 */
async function _updateProfileImage(data: any, ctx: Context) {
  const myUser = ctx.session.user;
  requireLogin(myUser);

  const user = await UserLogic.fetchUser(myUser, myUser);
  if (!user) throw { code: 404, message: "User not found." };
  const newImageAndUser = await UserLogic.updateUserImage(user, data, myUser);

  return { user: newImageAndUser.user, image: newImageAndUser.image };
}

const [ endpoint, updateProfileImage ] = buildApi("/api/profile/images", {PATCH: _updateProfileImage});
export { updateProfileImage };
export default endpoint;
