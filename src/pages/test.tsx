import { Page } from "components/design";
import React from "react";
import { isClient } from "utilities/tools";

export default function Test(): JSX.Element {
  if (isClient) {
    console.log("hop")
  }

  return (
    <Page>
      Test
      <button onClick={() => {console.log(typeof process);}}>Test</button>
    </Page>
  );
}
