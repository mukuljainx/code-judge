import * as React from "react";

import { ScreenType } from "../interfaces";
import AddVideo from "./add-video";

const App = (props: any) => {
  const [screen, setScreen] = React.useState<ScreenType>("AddVideo");

  switch (screen) {
    case "AddVideo":
      return <AddVideo changeScreen={setScreen} />;
    default:
      return <div>No Match</div>;
  }
};

export default React.memo(App);
