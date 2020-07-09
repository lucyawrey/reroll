import React from "react";
import { Button, ButtonGroup, Dropdown } from "react-bootstrap";
import Breadcrumbs from "../../../components/design/Breadcrumbs";
import Table from "../../../components/design/tables/Table";
import Page from "../../../components/design/Page";
import gamesystemJson from "./gamesystems.json";
import { TableBuilder } from "../../../helpers/design/table";
import Link from "next/link";
import GameSystemModel from "../../../models/database/gameSystems";
import ContextMenu from "../../../components/design/ContextMenu";
import { ContextMenuBuilder } from "../../../helpers/design/contextMenu";
import { MdBuild, MdInfo, MdPageview, MdBlock } from "react-icons/md";
import Tooltip from "../../../components/design/Tooltip";

const gameSystemActions = new ContextMenuBuilder()
  .addLink("Edit", MdBuild, "/admin/game-systems/[key]/edit")
  .addItem("Delete", MdBlock, (context: GameSystemModel) => (confirm(`Are you sure you want to delete ${context.name}?`)))

/**
 * 
 * @param props 
 */
function GameSystemActions(props: GameSystemModel) {
  // View, Details, Edit, Modules
  return (
    <ContextMenu as={ButtonGroup} context={props} {...gameSystemActions.renderConfig()}>
      <Tooltip title="View">
        <Link href="/game-systems/[key]" as={`/game-systems/${props.key}`}>
          <Button><MdPageview/></Button>
        </Link>
      </Tooltip>

      <Tooltip title="Details">
        <Link href="/admin/game-systems/[key]" as={`/admin/game-systems/${props.key}`}>
          <Button><MdInfo/></Button>
        </Link> 
      </Tooltip>

      <Tooltip title="More"><Dropdown.Toggle split id={`dropdown-toggle-${props.key}`}>...</Dropdown.Toggle></Tooltip>
    </ContextMenu>
  );
}

/**
 * Renders the Admin Game Systems page
 */
function GameSystems() {
  const tableBuilder = new TableBuilder()
    .addIncrementColumn("")
    .addDataColumn("Game System", "name")
    .addDataColumn("Content Count", "contentCount")
    .addDataColumn("Entity Count", "entityCount")
    .addDataColumn("Module Count", "moduleCount")
    .addComponentColumn("Tools", GameSystemActions);

  return (
    <Page>
      <h3>Game Systems</h3>
      <Breadcrumbs skipLevels={1} titles={["Admin", "Game Systems"]}/>
      <Link href="/admin/game-systems/new"><Button >+ Add Game System</Button></Link>
      {/* <NewGameSystemModal dirty={true}>
        <h5 >Add a new Game System</h5>
        <NewGamesystemForm/>
      </NewGameSystemModal> */}
      <Table {...tableBuilder.renderConfig()} data={gamesystemJson}/>
    </Page>
  );
}

GameSystems.getInitialProps = async () => {
  // const { gamesystems } = await client.query({query: getGameSystemQuery(1)})
  return { gamesystems: gamesystemJson }
}

export default GameSystems;
