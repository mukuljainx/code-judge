import * as React from "react";
import styled from "styled-components";

import Video from "../../components/video";
import Button from "../../components/button";

const Backdrop = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 222;
`;

const Wrapper = styled.div`
  background: white;
  width: 60%;
  height: 60%;
  background: white;
  border-radius: 4px;
  overflow: auto;
  padding: 16px;
`;

const VideoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const VideoWrapper = styled.div<{ active: boolean }>`
  cursor: pointer;
  margin-bottom: 16px;
  margin-right: 16px;
  width: 40%;
  border: 2px solid
    ${({ active, theme }) => (active ? theme.colors.primary : "rgba(0,0,0,0)")};
`;

const ActionWrapper = styled.div`
  margin-bottom: 16px;
  display: flex;
  justify-content: flex-end;
`;

interface IProps {
  videos: string[];
  selectVideo: (params: string[]) => void;
  closeModal: () => void;
}

const Modal = ({ videos, selectVideo, closeModal }: IProps) => {
  const [selected, setSelected] = React.useState<Record<number, boolean>>({});
  return (
    <Backdrop>
      <Wrapper>
        <h3>Choose Video</h3>
        <VideoContainer>
          {videos.map((url, index) => (
            <VideoWrapper
              key={index}
              active={selected[index]}
              onClick={() => {
                const a = { ...selected };
                a[index] = true;
                setSelected(a);
              }}
            >
              <Video key={index} style={{ width: "100%" }} src={url}></Video>
            </VideoWrapper>
          ))}
        </VideoContainer>
        <ActionWrapper>
          <Button style={{ marginRight: 16 }} onClick={() => closeModal()}>
            CLOSE
          </Button>
          <Button
            onClick={() =>
              selectVideo(
                Object.keys(selected).map((row) => videos[parseInt(row)])
              )
            }
          >
            SELECT VIDEOS
          </Button>
        </ActionWrapper>
      </Wrapper>
    </Backdrop>
  );
};

export default React.memo(Modal);
