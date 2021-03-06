import { ImageManager } from "client/library";
import { SceneController } from "client/scenes/SceneController";
import { observer } from "mobx-react-lite";
import { Application } from "pixi.js";
import React from "react";
import { SceneBuilderOverlay } from "../SceneBuilderOverlay";
import { SceneRenderer } from "../SceneRenderer";

const app = new Application({
  width: 500,
  height: 500,
  backgroundColor: 0xAAAAAA,
  antialias: true,
});

export const SceneBuilder = observer(() => {
  const [ sceneController ] = React.useState(new SceneController(app));
  const [ imageManager ] = React.useState(new ImageManager());
  return (
    <div>
      <SceneBuilderOverlay sceneController={sceneController}>
        <SceneRenderer sceneController={sceneController}/>
      </SceneBuilderOverlay>
    </div>
  );
});

export default SceneBuilder;
