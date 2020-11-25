import React from "react";
import Page from "../../../components/design/Page";
import { ContextMenuBuilder } from "../../../utilities/design/contextMenu";
import { MdAttachFile, MdClose, MdEdit, MdViewList } from "react-icons/md";
import ContextButtonGroup from "../../../components/design/contextMenus/ContextButtons";

// Used to create a generic context type for examples
interface ContextType {
  name: string;
}

/**
 * Renders a test page for Context Menus
 */
export default function TestContextMenu(): JSX.Element {
  const contextMenuBuilder1 = new ContextMenuBuilder()
    .addHeader("Testing Dropdown!")
    .addItem("View", MdViewList, (context: ContextType) => {alert("View " + context.name);})
    .addItem("Edit", MdEdit, (context: ContextType) => {alert("Editing " + context.name);})
    .addDivider()
    .addItem("Publish", MdAttachFile, (context: ContextType) => {alert("Publish " + context.name);})
    .addItem("Delete", MdClose, (context: ContextType) => {alert("Delete " + context.name);});

  const context = {name: "Test Gamesystem"};

  return (
    <Page>
      <h2>Context Menus!</h2>
      <h3>Context Menu</h3>
      {/* <ContextMenu {...contextMenuBuilder1.renderConfig()} context={context}>
        <Dropdown.Toggle id="dropdown-a">Test Me!</Dropdown.Toggle>
      </ContextMenu> */}

      <h3>Context Button Menu</h3>
      <ContextButtonGroup {...contextMenuBuilder1.renderConfig()} context={context}/>
    </Page>
  );
}
