import * as React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import styled from "styled-components";

import { ScreenType } from "../../interfaces";
import Input from "../../components/input";
import Icon from "../../components/icon";
import Video from "../../components/video";
import Button from "../../components/button";
import { VideosType } from "../";
import combineAPI from "../../service/combine-video";
import LoadingIcon from "../../components/loadingIcon";

const Wrapper = styled.div``;

const Field = styled.div`
  margin-bottom: 16px;
`;

const Flex = styled.div`
  display: flex;
`;

const FormVideoRow = styled(Field)`
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const VideWrapper = styled.div<{ index: number }>`
  display: flex;
  flex-direction: column;
  width: calc(50% - 8px);
  margin-right: ${({ index }) => (index % 2 === 0 ? "16px" : 0)};
`;

const Form = styled.form``;

const ButtonWrapper = styled.div`
  margin-bottom: 16px;
  cursor: pointer;
  display: inline-block;
`;

const Text = styled.p``;

const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.alert};
`;

const copyToClipboard = (str: string) => {
  const el = document.createElement("textarea");
  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
};

const validateVideoRow = (values: IFormValues) => {
  debugger;
  if (!values.segments) {
    return true;
  }
  return values.segments.some((segment) => {
    return !segment.video_url || !segment.start || !segment.end;
  });
};

export interface IFormValues {
  segments: Array<{
    video_url: string;
    start: string;
    end: string;
  }>;
  width: string;
  height: string;
}

interface IProps {
  changeScreen: (screen: ScreenType) => void;
  videosURL: VideosType;
}

const CombineVideo = ({ changeScreen, videosURL }: IProps) => {
  const { register, control, handleSubmit, getValues } = useForm<IFormValues>({
    mode: "onChange",
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "segments",
  });
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");
  const [combinedVideo, setCombinedVideo] = React.useState<string>("");

  const onSubmit = handleSubmit((data) => {
    setLoading(true);
    setError("");
    combineAPI(data)
      .then((data) => {
        setCombinedVideo(data.data.video_url);
        setLoading(false);
      })
      .catch(() => {
        setError("Something went wrong, please try again!");
        setLoading(false);
      });
  });

  return (
    <Wrapper>
      <ButtonWrapper onClick={() => changeScreen("AddVideo")}>
        <Icon>keyboard_backspace</Icon>
      </ButtonWrapper>
      <h3>Combine Video</h3>
      <Field>
        <Flex style={{ flexWrap: "wrap" }}>
          {videosURL.map((url, index) => (
            <VideWrapper key={index} index={index}>
              <Video controls style={{ width: "100%" }} src={url}></Video>
              <Text>
                <Button onClick={() => copyToClipboard(url)}>
                  <Icon>content_copy</Icon> Copy URL
                </Button>
              </Text>
            </VideWrapper>
          ))}
        </Flex>
      </Field>
      <hr />
      <Form onSubmit={onSubmit}>
        <Field>
          <Button
            type="button"
            onClick={() => {
              append({ name: "segments" });
            }}
            className="add-video"
          >
            ADD VIDEO
          </Button>
        </Field>
        {fields.map((item, index) => (
          <FormVideoRow key={item.id}>
            <Field style={{ marginBottom: 8 }}>
              <Input
                className={`combine-video-${index + 1}`}
                type="string"
                label="Video URL"
                name={`segments[${index}].video_url`}
                itemRef={register({ required: true })}
              />
            </Field>
            <Flex id={`range-row-${index}`}>
              <Input
                className={`combine-video-range-duration-start-${index + 1}`}
                style={{ marginRight: 8 }}
                type="number"
                label="Start"
                name={`segments[${index}].start`}
                itemRef={register({ required: true })}
              />
              <Input
                className={`combine-video-range-duration-end-${index + 1}`}
                style={{ marginRight: 8 }}
                type="number"
                label="End"
                name={`segments[${index}].end`}
                itemRef={register({ required: true })}
              />
              <Button
                className={`delete-combine-video-range-duration-${index + 1}`}
                onClick={() => remove(index)}
              >
                <Icon>close</Icon>
              </Button>
            </Flex>
          </FormVideoRow>
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
        {error && <ErrorText>{error}</ErrorText>}
        <Field>
          <Button
            type="submit"
            className="combine-video"
            disabled={validateVideoRow(getValues()) || loading}
          >
            COMBINE VIDEO(S)
            {loading && <LoadingIcon>refresh</LoadingIcon>}
          </Button>
        </Field>
      </Form>

      {combinedVideo && (
        <>
          <h3>Combined Video:</h3>
          <Video src={combinedVideo} controls style={{ width: "100%" }}></Video>
        </>
      )}
    </Wrapper>
  );
};

export default CombineVideo;
