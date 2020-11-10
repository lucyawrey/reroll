import { InputType } from "type-graphql";
import { CoreFilter } from "./CoreFilter";

/**
 * Describes the various filters that may be applied to asset Common Content Types for searching
 */
@InputType()
export class CommonContentTypeFilter extends CoreFilter { 
}

/**
 * Extends the original filters to have the base filters and any additional or operators
 */
@InputType()
export class CommonContentTypeFilters extends CommonContentTypeFilter {
  or?: CommonContentTypeFilter[];
}