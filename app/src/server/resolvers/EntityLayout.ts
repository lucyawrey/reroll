import { EntityLayout, EntityLayoutModel } from "@reroll/model/dist/documents";
import { DeleteResponse, UpdateResponse } from "@reroll/model/dist/models/graphQLResponses";
import { EntityLayoutFilters } from "@reroll/model/dist/filters";
import { CreateEntityLayoutInput, UpdateEntityLayoutInput } from "@reroll/model/dist/inputs";
import { Options } from "@reroll/model/dist/inputs/Options";
import { Arg, Args, Authorized, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";
import { CoreResolver } from "./CoreResolver";
import { FindOneResponse, FindManyResponse, CreateOneResponse, UpdateOneResponse, DeleteOneResponse, FindCountResponse } from "../../types/resolvers";
import { Context } from "../../types/server";

/**
 * Resolves entity layout queries
 */
@Resolver(EntityLayout)
export class EntityLayoutResolver extends CoreResolver {
  protected model = EntityLayoutModel;

  /**
   * Fetches a document matching the given id or aliases
   * @param _id The id or alias of the document to return
   */
  @Query(() => EntityLayout, { nullable: true })
  public entityLayout(@Ctx() ctx: Context, @Arg("_id") _id: string): FindOneResponse<EntityLayout> {
    return super.findByAlias(ctx, _id) as FindOneResponse<EntityLayout>;
  }

  /**
   * Fetches the documents matching the filter and options
   */
  @Query(() => [EntityLayout])
  public entityLayouts(
    @Ctx() ctx: Context,
    @Arg("filters", {nullable: true}) filters?: EntityLayoutFilters,
    @Args() options?: Options
  ): FindManyResponse<EntityLayout> {
    return super.findMany(ctx, filters, options) as FindManyResponse<EntityLayout>;
  }

  /**
   * Returns a count of all of the documents matching the given filters
   * @param filters The filter object to count documents by. Identical to other filters
   */
  @Query(() => Int)
  public entityLayoutCount(@Ctx() ctx: Context, @Arg("filters", {nullable: true}) filters?: EntityLayoutFilters): FindCountResponse {
    return super.findCount(ctx, filters);
  }

  /**
   * Inserts a new document into the database
   * @param data the data to insert into a new document
   */
  @Authorized()
  @Mutation(() => EntityLayout)
  public createEntityLayout(@Ctx() ctx: Context, @Arg("data") data: CreateEntityLayoutInput): Promise<CreateOneResponse<EntityLayout>> {
    return super.createOne(ctx, data) as Promise<CreateOneResponse<EntityLayout>>;
  }

  /**
   * Updates a document with new data. Data not present will not be changed.
   * @param _id The id of the document to update
   * @param data The new data to upsert into the document
   */
  @Authorized()
  @Mutation(() => UpdateResponse)
  public updateEntityLayout(
    @Ctx() ctx: Context,
    @Arg("_id") _id: string,
    @Arg("data") data: UpdateEntityLayoutInput
  ): Promise<UpdateOneResponse> {
    return super.updateOne(ctx, _id, data);
  }

  /**
   * Deletes a document
   * @param _id The id of the document to delete
   */
  @Authorized()
  @Mutation(() => DeleteResponse)
  public deleteEntityLayout(@Ctx() ctx: Context, @Arg("_id") _id: string): Promise<DeleteOneResponse> {
    return super.deleteOne(ctx, _id);
  }
}