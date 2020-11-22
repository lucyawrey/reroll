import React from "react";
import Breadcrumbs from "../../../../components/design/Breadcrumbs";
import GameSystemForm from "../../../../components/admin/gameSystems/Form";
import Page from "../../../../components/design/Page";
import gql from "graphql-tag";
import { NextPageContext } from "next";
import { client } from "../../../../utilities/graphql/apiClient";
import { GameSystem } from "@reroll/model/dist/documents/GameSystem";
import { useRouter } from "next/router";
import { UpdateGameSystemInput } from "@reroll/model/dist/inputs";

interface EditGameSystemProps {
  gameSystem: GameSystem;
}

/**
 * Renders a the page to create a new game system
 * @param gameSystem The game system to be edited
 * @param themes The themes to render within the form
 */
function EditGameSystem({gameSystem}: EditGameSystemProps): JSX.Element {
  const router = useRouter();

  /**
   * Runs the operation to update 
   * @param values The updated game system values to update
   */
  function updateGameSystem(values: UpdateGameSystemInput) {
    const updateGameSystem = gql`mutation{
      updateGameSystem (_id: "${gameSystem._id}", data: {
        name: "${values.name}",
        alias: "${values.alias}"
      }) {
        ok
      }
    }`;

    client.mutate({mutation: updateGameSystem})
    .then(() => {
      router.push(`/admin/game-systems/${values.alias}`)
      console.log("Updated!")
    })
  }

  // TODO - handle if gamesystem is empty
  const name = gameSystem.name || "";
  return (
    <Page>
      <h1>Update {name}</h1>
      <Breadcrumbs skipLevels={1} titles={["Admin", "Game Systems", name, "Edit"]}/>

      <br/>

      <GameSystemForm 
        initialValues={gameSystem}
        onSubmit={
          (values: UpdateGameSystemInput) => updateGameSystem(values)}
      />
    </Page>
  );
}

EditGameSystem.getInitialProps = async (ctx: NextPageContext) => {
  const alias = ctx.query.gameSystemAlias;
  
  const query = gql`
  query {
    gameSystem (_id: "${alias}") {
      _id,
      name,
      alias,
      description,
      defaultThemeID
    }
  }`;

  const { data } = await client.query({query: query});
  
  return { 
    themes: [{"name": "Default", "id": "default"}],
    gameSystem: data.gameSystem
  };
}

export default EditGameSystem;
