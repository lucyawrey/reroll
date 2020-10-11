import React from "react";
import Page from "../../../../components/design/Page";
import { Card, Button, Col, Row } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import Breadcrumbs from "../../../../components/design/Breadcrumbs";
import { NextPageContext } from "next";
import gql from "graphql-tag"; 
import { client } from "../../../../utilities/graphql/apiClient";
import { CampaignCard } from "../../../../components/admin/campaigns/Card";
import { EntityTypeCard } from "../../../../components/admin/entityTypes/Card";
import { ModuleCard } from "../../../../components/admin/modules/Card";
import { ContentCard } from "../../../../components/admin/content/Card";
import { EntityCard } from "../../../../components/admin/entities/Card";
import { ContentTypeCard } from "../../../../components/admin/contentTypes/Card";

/**
 * Publishes a game system
 * @param _id The id of the gamesystem to publish
 */
function publish(_id: string) {
  const publishGameSystem = gql`mutation {
    updateGameSystem(_id: "${_id}", data: {isPublished: true}) {
      ok
    }
  }`;

  client.mutate({mutation: publishGameSystem})
  .then((res: any) => {
    // TODO - need a way to refetch this!
    console.log("Published!")
  })
}

/**
 * Renders the information page for the game system
 * @param gameSystem The gamesystem object pulled from the database
 * @param modules A list of modules ordered by last updated to provide a peek
 * @param moduleCount The total count of modules that exist within this gamesystem
 * @param entityCount The total count of entities that exist within this gamesystem
 * @param contentCount The total count of content that exist within this gamesystem
 */
export default function GameSystemView({
  gameSystem,
  modules,
  moduleCount,
  contentTypes,
  entityTypes,
  entityCount, 
  contentCount
}: any) {
  const router = useRouter();
  const alias = router.query.gameSystemAlias;
  
  return (
    <Page>
      <h1>{gameSystem.name}</h1>
      <Breadcrumbs skipLevels={1} titles={["Admin", "Game Systems", gameSystem.name!]}/>

      <Row>
        <Col lg={3} md={4} sm={6} xs={12}>
          <Card><Card.Body>
            <>Modules</>
            <p>{moduleCount}</p>  
          </Card.Body></Card>
        </Col>

        <Col lg={3} md={4} sm={6} xs={12}>
          <Card><Card.Body>
            <>Entities</>
            <p>{entityCount}</p>  
          </Card.Body></Card>
        </Col>

        <Col lg={3} md={4} sm={6} xs={12}>
          <Card><Card.Body>
            <>Content</>
            <p>{contentCount}</p>  
          </Card.Body></Card>
        </Col>

        <Col lg={3} md={4} sm={6} xs={12}>
          <Card><Card.Body>
            <>Published?</>
            <p>{gameSystem.isPublished ? "Yes" : "No"}</p>  
          </Card.Body></Card>
        </Col>
      </Row>

      <hr/>

      <Row>
        <Col>
          {/* Content Types */}
          <Card>
            <Card.Header>
              <>Details</>
            </Card.Header>
            <Card.Body>
              <b>Description:</b> {gameSystem.description}<br/>
              <b>Alias:</b> {gameSystem.alias}<br/>
              <b>Created At:</b> {gameSystem.createdAt}<br/>
              <b>Last Edited At:</b> {gameSystem.updatedAt}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <hr/>

      <Row>
        <Col lg={6} md={12}>
          {/* Content Types */}
          <ContentTypeCard gameSystem={gameSystem} contentTypes={contentTypes}/>

        </Col>

        <Col lg={6} md={12}>
          <EntityTypeCard gameSystem={gameSystem} entityTypes={entityTypes}/>
        </Col>
      </Row>
      
      <hr/>

      <ModuleCard gameSystem={gameSystem} modules={modules}/>

      <hr/>

      <CampaignCard gameSystem={gameSystem} campaigns={[]}/>

      <hr/>

      <EntityCard gameSystem={gameSystem} entities={[]}/>

      <hr/>

      <ContentCard gameSystem={gameSystem} content={[]}/>

      <hr/>

      <Card>
        <Card.Header>
          Settings
        </Card.Header>

        <Card.Body>
          <Link href={"/admin/game-systems/" + alias + "/edit"}  passHref>
            <Button>Edit</Button>
          </Link>

          <Button 
            disabled={gameSystem.isPublished}
            onClick={() => publish(gameSystem._id)}
          >
            Publish{gameSystem.isPublished ? "ed" : ""}
          </Button>
          <Button>Delete</Button>

        </Card.Body>
      </Card>
      
    </Page>
  );
}

GameSystemView.getInitialProps = async (ctx: NextPageContext) => {
  const alias = ctx.query.gameSystemAlias;

  const gameSystemQuery = gql`
  {
    gameSystem (_id: "${alias}") {
      _id,
      name,
      alias,
      description,
      isPublished,
      createdAt,
      updatedAt,
    }
  }`;

  const { data } = await client.query({query: gameSystemQuery});

  const moduleQuery = gql`
  query {
    modules (filters: {gameSystemID_eq: "${data.gameSystem._id}"}) {
      _id,
      name, 
      alias,
      publishType,
      isPublished,
      isPurchasable,
      cost
    },
    moduleCount (filters: {gameSystemID_eq: "${data.gameSystem._id}"}),
    contentTypes (filters: {gameSystemID_eq: "${data.gameSystem._id}"}) {
      _id,
      name,
      alias
    },
    contentTypeCount (filters: {gameSystemID_eq: "${data.gameSystem._id}"})
  }`;
  
  const moduleData  = await client.query({query: moduleQuery});
  return {
    gameSystem: data.gameSystem, 
    modules: moduleData.data.modules,
    moduleCount: moduleData.data.moduleCount,
    contentTypes: moduleData.data.contentTypes,
    entityTypes: [],
    entityCount: 0,
    contentCount: 0
  };
}