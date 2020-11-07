import { Resolver, Query, Mutation, Arg, Args, Ctx, Authorized } from "type-graphql";
import { CoreResolver } from "./CoreResolver";
import { Character, CharacterFilter, CharacterModel } from "@reroll/model/dist/documents/Character";
import { CharacterInput } from "@reroll/model/dist/inputs/CharacterInput";
import { Options } from "@reroll/model/dist/inputs/Options";
import { DeleteResponse, UpdateResponse } from "@reroll/model/dist/documents/Responses";
import { authorize } from "../utilities/auth";

/**
 * Resolves Character queries
 */
@Resolver()
export class CharacterResolver extends CoreResolver {
  protected model = CharacterModel;

  /**
   * Fetches an character document matching the given id
   * @param _id The id of the character document to return
   */
  @Query(() => Character, { nullable: true })
  async character(@Arg("_id") _id: string): Promise<Character | null> {
    return super.resolver(_id);
  }

  // test resolver
  // Block entire resolver @Authorized()
  @Query(() => Character)
  async user(@Ctx() ctx: any): Promise<Character> {
    const authed = await authorize(ctx);
    const user = ctx.session.user;
    console.log(user)
    if (authed) {
      return { _id: user.email, name: user.name }
    } else {
      return { _id: "oooooooooo", name: "aaaaaaaaaa" }
    }
  }

  /**
   * Fetches the character documents matching the filter and options
   */
  @Query(() => [Character])
  async characters(
    @Arg("filters", CharacterFilter, {nullable: true}) filters?: any,
    @Args() options?: Options
  ): Promise<Character[]> {
    super.resolverCount(filters);
    return await super.resolvers(filters, options);
  }

  /**
   * Returns a count of all of the documents matching the given filters
   * @param filters The filter object to count documents by. Identical to other filters
   */
  @Query(() => Number)
  characterCount(@Arg("filters", CharacterFilter, {nullable: true}) filters?: any) {
    return super.resolverCount(filters);
  }

  /**
   * Creates a new character document
   * @param data The data object to make into a new character
   */
  @Authorized()
  @Mutation(() => Character)
  newCharacter(@Arg("data") data: CharacterInput): Promise<Character> {
    return super.newResolver(data);
  }

  /**
   * Updates a single character document
   * @param _id The id of the document to update
   * @param data The data to replace in the document
   */
  @Authorized()
  @Mutation(() => UpdateResponse)
  updateCharacter(
    @Arg("_id") _id: string,
    @Arg("data") data: CharacterInput
  ): Promise<UpdateResponse> {
    return super.updateResolver(_id, data)
  }

  /**
   * Updates multiple character documents
   * @param data The data to replace in the document
   * @param filters The filters to select the data to replace in the document
   */
  @Authorized()
  @Mutation(() => UpdateResponse)
  updateCharacters(
    @Arg("data") data: CharacterInput,
    @Arg("filters", CharacterFilter, {nullable: true}) filters?: any
  ): Promise<UpdateResponse> {
    return super.updateResolvers(data, filters);
  }

  /**
   * Deletes a single character document
   * @param _id The id of the character document to delete
   */
  @Authorized()
  @Mutation(() => DeleteResponse)
  deleteCharacter(@Arg("_id") _id: string): Promise<DeleteResponse> {
    return super.deleteResolver(_id);
  }

  /**
   * Deletes a single character document
   * @param filters The id of the character document to delete
   */
  @Authorized()
  @Mutation(() => DeleteResponse)
  async deleteCharacters(@Arg("filters", CharacterFilter, {nullable: true}) filters?: any): Promise<DeleteResponse> {
    return super.deleteResolvers(filters);
  }
}