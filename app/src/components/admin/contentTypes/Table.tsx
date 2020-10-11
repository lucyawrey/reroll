import { TableBuilder } from "../../../utilities/design/table";
import Table from "../../design/tables/Table";
import { PageState } from "../../design/Pagination";
import { ContextMenuBuilder } from "../../../utilities/design/contextMenu";
import { GameSystem } from "@reroll/model/dist/documents/GameSystem";
import ContextMenu from "../../design/contextMenus/ContextMenu";
import { MdPageview, MdInfo, MdBuild } from "react-icons/md";
import { ContentType } from "@reroll/model/dist/documents/ContentType";

export interface ContentTypeTableProps {
  contentTypes: ContentType[];
  gameSystem: GameSystem;
  pageState: PageState;
}


const contentTypeActions = new ContextMenuBuilder()
  .addLink("View", MdPageview, "/[gameSystemAlias]/[contentTypeAlias]") // TODO - add ability to conditionally display
  .addLink("Details", MdInfo, "/admin/game-systems/[gameSystemAlias]/content-types/[contentTypeAlias]")
  .addLink("Edit", MdBuild, "/admin/game-systems/[gameSystemAlias]/content-types/[contentTypeAlias]/edit")
  .addLink("Edit Fields", MdBuild, "/admin/game-systems/[gameSystemAlias]/content-types/[contentTypeAlias]/fields")
  .addLink("Edit Card Layout", MdBuild, "/admin/game-systems/[gameSystemAlias]/content-types/[contentTypeAlias]/card-layout")
  .addLink("Edit Search Layout", MdBuild, "/admin/game-systems/[gameSystemAlias]/content-types/[contentTypeAlias]/search-layout")

/**
 * Renders the actions for the game systems page
 * @param props A game system object
 */
function ContentTypeActions(data: any, globalData: GameSystem) {
  // View, Details, Edit, Modules

  return (
    <ContextMenu 
      context={{
        name: data.name,
        contentTypeAlias: data.alias || data._id,
        gameSystemAlias: globalData.alias || globalData._id
      }} 
      {...contentTypeActions.renderConfig()}
    />
  );
}

const tableBuilder = new TableBuilder()
.addIncrementColumn("")
.addDataColumn("Content Type", "name")
.addDataColumn("Alias", "alias", (alias?: string) => (alias ? alias : "--"))
.addDataColumn("Is Type Only?", "isTypeOnly", (isTypeOnly: boolean) => (isTypeOnly ? "Yes" : "No"))
.addComponentColumn("Tools", ContentTypeActions);

/**
 * Renders a table with entities
 * @param props.contentTypes An array of entities of to render into a table
 * @param props.pageState A page state containing page and perPage
 */
export function ContentTypeTable(props: ContentTypeTableProps) {
  return <Table 
    {...tableBuilder.renderConfig()} 
    data={props.contentTypes} 
    globalData={props.gameSystem}
    startingIncrement={(props.pageState.page - 1) * props.pageState.perPage + 1}
  />
}