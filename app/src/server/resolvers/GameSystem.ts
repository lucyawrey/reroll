import { GameSystem, GameSystemModel } from "@reroll/model/dist/documents";
import { DeleteResponse, UpdateResponse } from "@reroll/model/dist/models/graphQLResponses";
import { GameSystemFilters } from "@reroll/model/dist/filters";
import { CreateGameSystemInput, UpdateGameSystemInput } from "@reroll/model/dist/inputs";
import { Options } from "@reroll/model/dist/inputs/Options";
import { Arg, Args, Authorized, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";
import { CoreResolver } from "./CoreResolver";
import { FindOneResponse, FindManyResponse, FindCountResponse, CreateOneResponse, UpdateOneResponse, DeleteOneResponse } from "../../types/resolvers";
import { Context } from "../../types/server";

/**
 * Resolves game system queries
 */
@Resolver(GameSystem)
export class GameSystemResolver extends CoreResolver {
  protected model = GameSystemModel;

  /**
   * Fetches a document matching the given id or aliases
   * @param _id The id or alias of the document to return
   */
  @Query(() => GameSystem, { nullable: true })
  public gameSystem(@Ctx() ctx: Context, @Arg("_id") _id: string): FindOneResponse<GameSystem> {
    return super.findByAlias(ctx, _id) as FindOneResponse<GameSystem>;
  }

  /**
   * Fetches the documents matching the filter and options
   */
  @Query(() => [GameSystem])
  public gameSystems(
    @Ctx() ctx: Context,
    @Arg("filters", {nullable: true}) filters?: GameSystemFilters,
    @Args() options?: Options
  ): FindManyResponse<GameSystem> {
    return super.findMany(ctx, filters, options) as FindManyResponse<GameSystem>;
  }

  /**
   * Returns a count of all of the documents matching the given filters
   * @param filters The filter object to count documents by. Identical to other filters
   */
  @Query(() => Int)
  public gameSystemCount(
    @Ctx() ctx: Context,
    @Arg("filters", {nullable: true}) filters?: GameSystemFilters
  ): FindCountResponse {
    return super.findCount(ctx, filters);
  }

  /**
   * Inserts a new document into the database
   * @param data the data to insert into a new document
   */
  @Authorized()
  @Mutation(() => GameSystem)
  public createGameSystem(@Ctx() ctx: Context, @Arg("data") data: CreateGameSystemInput): Promise<CreateOneResponse<GameSystem>> {
    return super.createOne(ctx, data) as Promise<CreateOneResponse<GameSystem>>;
  }

  /**
   * Updates a document with new data. Data not present will not be changed.
   * @param _id The id of the document to update
   * @param data The new data to upsert into the document
   */
  @Authorized()
  @Mutation(() => UpdateResponse)
  public updateGameSystem(
    @Ctx() ctx: Context,
    @Arg("_id") _id: string,
    @Arg("data") data: UpdateGameSystemInput
  ): Promise<UpdateOneResponse> {
    return super.updateOne(ctx, _id, data);
  }

  /**
   * Deletes a document
   * @param _id The id of the document to delete
   */
  @Authorized()
  @Mutation(() => DeleteResponse)
  public deleteGameSystem(@Ctx() ctx: Context, @Arg("_id") _id: string): Promise<DeleteOneResponse> {
    return super.deleteOne(ctx, _id);
  }
}
  /**
   * Creates a new gameSystem document and default module
   * @param data The data object to make into a new gameSystem
   */
  // @Authorized()
  // @Mutation(() => GameSystem)
  // async newGameSystem(
  //   @Arg("data") data: GameSystemInput,
  //   @Ctx() ctx: any
  // ) {
  //   const session = await startSession();
  //   let gameSystemDocument = null;

  //   const publishTypeError = validatePublishType(ctx, data.publishType);
  //   if (publishTypeError) { throw Error(publishTypeError); ;}
    
  //   try {
  //     // Starts a transaction to 
  //     session.startTransaction();
  //     gameSystemDocument = await super.newResolver(data, { session: session });

  //     const moduleResolver = new ModuleResolver();
  //     const moduleDocument = await moduleResolver.newModule({
  //       name: "Standard Rules", 
  //       gameSystemID: gameSystemDocument._id,
  //       publishType: data.publishType
  //     }, { session });

  //     this.updateGameSystem(
  //       gameSystemDocument._id, 
  //       { defaultModuleID: moduleDocument._id }, 
  //       { session }
  //     );

  //     gameSystemDocument.defaultModuleID = moduleDocument._id;

  //     session.commitTransaction();
  //     return gameSystemDocument;

  //   } catch (error) {
  //     await session.abortTransaction();
  //     session.endSession();
  //     throw error;
  //   }
  // }

// }