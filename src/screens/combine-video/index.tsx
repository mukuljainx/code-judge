import * as React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import styled from "styled-components";

import { ScreenType } from "../../interfaces";
import Input from "../../components/input";
import Icon from "../../components/icon";
import Video from "../../components/video";
import Button from "../../components/button";
import { VideosType } from "../";

const Wrapper = styled.div``;

const Field = styled.div`
  margin-bottom: 16px;
`;

const Flex = styled.div`
  display: flex;
`;

const ButtonWrapper = styled.div`
  margin-bottom: 16px;
  cursor: pointer;
  display: inline-block;
`;

interface IProps {
  changeScreen: (screen: ScreenType) => void;
  videosURL: VideosType;
}

const CombineVideo = ({ changeScreen, videosURL }: IProps) => {
  const { register, control, handleSubmit } = useForm({});
  const { fields, append, prepend, remove } = useFieldArray({
    control,
    name: "combine",
  });

  return (
    <Wrapper>
      <ButtonWrapper onClick={() => changeScreen("AddVideo")}>
        <Icon>keyboard_backspace</Icon>
      </ButtonWrapper>
      <Field>
        <Flex style={{ flexWrap: "wrap" }}>
          {videosURL.map((url, index) => (
            <Video
              controls
              key={index}
              style={{ width: "40%", marginRight: 16, marginBottom: 16 }}
              src={url}
            ></Video>
          ))}
        </Flex>
      </Field>
      <Field>
        <Button className="add-video">ADD VIDEO</Button>
      </Field>
      {fields.map((item, index) => (
        <Field key={item.id}>
          <Flex id={`range-row-${index}`}>
            <Input
              className={`combine-video-range-duration-start-${index + 1}`}
              style={{ marginRight: 8 }}
              type="number"
              label="Start"
              name={`range[${index}].start`}
              itemRef={register({ required: true })}
            />
            <Input
              className={`combine-video-range-duration-start-${index + 1}`}
              style={{ marginRight: 8 }}
              type="number"
              label="Start"
              name={`range[${index}].start`}
              itemRef={register({ required: true })}
            />
            <Input
              className={`combine-video-range-duration-end-${index + 1}`}
              style={{ marginRight: 8 }}
              type="number"
              label="End"
              name={`range[${index}].end`}
              itemRef={register({ required: true })}
            />
            <Button
              className={`delete-combine-video-range-duration-${index + 1}`}
              onClick={() => remove(index)}
            >
              <Icon>keyboard_backspace</Icon>
            </Button>
          </Flex>
        </Field>
      ))}
      <Field>
        <Flex>
          <Input
            width={240}
            className="video-height"
            style={{ marginRight: 8 }}
            type="number"
            label="Video Height"
            name="height"
            defaultValue="100"
            itemRef={register({ required: true })}
          />
          <Input
            width={240}
            className="video-height"
            style={{ marginRight: 8 }}
            type="number"
            label="Video Width"
            name="width"
            defaultValue="100"
            itemRef={register({ required: true })}
          />
        </Flex>
      </Field>
      <Button className="combine-video">COMBINE VIDEO(S)</Button>
    </Wrapper>
  );
};

export default CombineVideo;
