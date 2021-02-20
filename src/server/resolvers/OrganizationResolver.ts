import { CoreDocument, OrganizationModel } from "../../types/documents";
import { Context } from "../../types/server";
import CoreResolver from "./CoreResolver";

/**
 * The resolver for CRUD operations on the Organization model. 
 */
export class OrganizationResolver extends CoreResolver {
  public static model = OrganizationModel;

  /**
   * Overrides the create one function of the Core Resolver
   * @param data The data to save to the database
   * @param ctx The context of the request being sent
   */
  public static createOne(data: CoreDocument, ctx?: Context) {
    // TODO - Does name already exist?
    return super.createOne(data, ctx);
  }
}