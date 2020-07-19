import * as React from "react";
import styled from "styled-components";

import { ScreenType } from "../interfaces";
import AddVideo from "./add-video";
import CombineVideo from "./combine-video";
import Card from "../components/card";

const Wrapper = styled.div`
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.light};
  height: 100%;
`;

const AddVideoWrapper = styled.div<{ show: boolean }>`
  position: absolute;
  width: calc(100% - 32px);
  transition: all 0.7s linear;
  overflow: hidden;
  height: 0;
  ${({ show }) =>
    show &&
    `overflow: auto;
    height: auto;`};
  ${({ show }) => `left: ${show ? "16px" : "-100%"}`};
`;

const CombineVideoWrapper = styled.div<{ show: boolean }>`
  position: absolute;
  width: calc(100% - 32px);
  transition: all 0.7s linear;
  left: 100%;
  overflow: hidden;
  height: 0;
  ${({ show }) =>
    show &&
    `overflow: auto;
    height: auto;`};
  ${({ show }) => `left: ${show ? "16px" : "100%"}`};
`;

export type VideosType = string[];

const App = () => {
  const [screen, setScreen] = React.useState<ScreenType>("AddVideo");
  const [videosURL, setVideosURL] = React.useState<VideosType>([]);

  return (
    <Wrapper>
      <Card width="80%" height="90%" style={{ position: "relative" }}>
        <AddVideoWrapper show={screen === "AddVideo"}>
          <AddVideo changeScreen={setScreen} setVideosURL={setVideosURL} />
        </AddVideoWrapper>
        <CombineVideoWrapper show={screen === "CombineVideo"}>
          <CombineVideo videosURL={videosURL} changeScreen={setScreen} />
        </CombineVideoWrapper>
      </Card>
    </Wrapper>
  );
};

export default React.memo(App);
