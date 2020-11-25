import { Campaign, CampaignModel } from "@reroll/model/dist/documents";
import { DeleteResponse, UpdateResponse } from "@reroll/model/dist/models/graphQLResponses";
import { CampaignFilters } from "@reroll/model/dist/filters";
import { CreateCampaignInput, UpdateCampaignInput } from "@reroll/model/dist/inputs";
import { Options } from "@reroll/model/dist/inputs/Options";
import { Arg, Args, Authorized, Int, Mutation, Query, Resolver } from "type-graphql";
import { CoreResolver } from "./CoreResolver";
import {
  CreateOneResponse,
  DeleteOneResponse,
  FindCountResponse,
  FindManyResponse,
  FindOneResponse,
  UpdateOneResponse,
} from "../../types/resolvers";

/**
 * Resolves campaign queries
 */
@Resolver(Campaign)
export class CampaignResolver extends CoreResolver {
  protected model = CampaignModel;

  /**
   * Fetches a document matching the given id or aliases
   * @param _id The id or alias of the document to return
   */
  @Query(() => Campaign, { nullable: true })
  public campaign(@Arg("_id") _id: string): FindOneResponse<Campaign> {
    return super.findByAlias(_id) as FindOneResponse<Campaign>;
  }

  /**
   * Fetches the documents matching the filter and options
   */
  @Query(() => [Campaign])
  public campaigns(
    @Arg("filters", {nullable: true}) filters?: CampaignFilters,
    @Args() options?: Options
  ): FindManyResponse<Campaign> {
    return super.findMany(filters, options) as FindManyResponse<Campaign>;
  }

  /**
   * Returns a count of all of the documents matching the given filters
   * @param filters The filter object to count documents by. Identical to other filters
   */
  @Query(() => Int)
  public campaignCount(@Arg("filters", {nullable: true}) filters?: CampaignFilters): FindCountResponse {
    return super.findCount(filters);
  }

  /**
   * Inserts a new document into the database
   * @param data the data to insert into a new document
   */
  @Authorized()
  @Mutation(() => Campaign)
  public createCampaign(@Arg("data") data: CreateCampaignInput): Promise<CreateOneResponse<Campaign>> {
    return super.createOne(data) as Promise<CreateOneResponse<Campaign>>;
  }

  /**
   * Updates a document with new data. Data not present will not be changed.
   * @param _id The id of the document to update
   * @param data The new data to upsert into the document
   */
  @Authorized()
  @Mutation(() => UpdateResponse)
  public updateCampaign(
    @Arg("_id") _id: string,
    @Arg("data") data: UpdateCampaignInput
  ): Promise<UpdateOneResponse> {
    return super.updateOne(_id, data);
  }

  /**
   * Deletes a document
   * @param _id The id of the document to delete
   */
  @Authorized()
  @Mutation(() => DeleteResponse)
  public deleteCampaign(@Arg("_id") _id: string): Promise<DeleteOneResponse> {
    return super.deleteOne(_id);
  }
}
