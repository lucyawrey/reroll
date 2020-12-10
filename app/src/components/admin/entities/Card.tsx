import { Button, Card } from "react-bootstrap";
import Link from "next/link";
import { EntityTable } from "./Table";
import { GameSystem } from "@reroll/model/dist/documents/GameSystem";
import { Entity } from "@reroll/model/dist/documents";

interface EntityCardProps {
  gameSystem: GameSystem;
  entities: Entity[]; //Entity[];
}

/**
 * Renders a card with a table for entities
 * @param props.gameSystem The game system of the entities to render
 * @param props.entities The array of entities to render into the card
 */
export function EntityCard(props: EntityCardProps): JSX.Element {
  const gameSystemAlias = props.gameSystem.alias || props.gameSystem._id;

  return (
    <Card>
      <Card.Header>
        <>Entities</>
        <Link href={"/admin/game-systems/" + gameSystemAlias + "/entities/new"}  passHref>
          <Button size="sm" style={{float:"right"}}>Add Entity</Button>
        </Link>
        <Link href={"/admin/game-systems/" + gameSystemAlias + "/entities"}  passHref>
          <Button size="sm" style={{float:"right"}}>Search Entities</Button>
        </Link>
      </Card.Header>

      <Card.Body>
        <EntityTable entities={props.entities} pageState={{page: 1, perPage: 10, totalCount: 10}}/>
      </Card.Body>
    </Card>
  );
}
