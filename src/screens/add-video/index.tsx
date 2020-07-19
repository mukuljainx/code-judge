import * as React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";

import { ScreenType, SettingType } from "../../interfaces";
import RangeSetting from "./rangeSetting";
import Input from "../../components/input";
import Button from "../../components/button";
import Select from "../../components/select";
import segmentAPI from "../../service/video-segment";
import LoadingIcon from "../../components/loadingIcon";
import { VideosType } from "../";

const Wrapper = styled.div``;

const Form = styled.form``;

const Field = styled.div`
  margin-bottom: 16px;
`;

const Text = styled.p`
  color: ${({ theme }) => theme.colors.alert};
`;

interface IProps {
  changeScreen: (screen: ScreenType) => void;
  setVideosURL: (param: VideosType) => void;
}

const options: Array<{ value: SettingType; label: string }> = [
  {
    value: "interval-duration",
    label: "Interval Duration",
  },
  {
    value: "range-duration",
    label: "Range Duration",
  },
  {
    value: "number-of-segments",
    label: "Number Of Segments",
  },
];

type FormValues = {
  link: string;
  setting: SettingType;
  range: Array<{ start: string; end: string }>;
  no_of_segments: string;
  interval_duration: string;
};

const isFormValid = (values: FormValues) => {
  switch (values.setting) {
    case "interval-duration": {
      return !values.interval_duration;
    }
    case "number-of-segments": {
      return !values.no_of_segments;
    }
    case "range-duration": {
      return !values.range || values.range.length === 0;
    }
  }
};

let initialRender = true;

const AddVideo = ({ changeScreen, setVideosURL }: IProps) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");
  const { handleSubmit, register, control, watch, errors, getValues } = useForm<
    FormValues
  >({
    mode: "onChange",
  });

  const setting = watch("setting", options[0].value);
  const rangeErrors: boolean[] = (getValues().range || []).map(
    (row) => parseInt(row.start, 10) > parseInt(row.end, 10)
  );
  const isRangeError = rangeErrors.find((row) => row);

  const onSubmit = handleSubmit(({ link, setting, ...rest }) => {
    setLoading(true);
    setError("");
    segmentAPI(link, setting, rest)
      ?.then((data) => {
        setLoading(false);
        setVideosURL(data.data.interval_videos.map((row) => row.video_url));
        changeScreen("CombineVideo");
      })
      .catch((error) => {
        setLoading(false);
        setError("Something Went wrong, please try again later");
      });
  });

  React.useEffect(() => {
    initialRender = false;
  }, []);

  React.useEffect(() => {
    if (isRangeError) {
      const index = rangeErrors.findIndex((row) => row);
      document.querySelector(`range-row-${index}`)?.scrollIntoView();
    }
  });

  return (
    <Wrapper>
      <h3>Segment Video</h3>
      <Form onSubmit={onSubmit}>
        <Field>
          <Input
            className="video-link"
            label="Video Link"
            name="link"
            itemRef={register({
              required: "Required",
              pattern: {
                value: /[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?/gi,
                message: "invalid email address",
              },
            })}
          />
        </Field>
        <Field>
          <Select
            className="segment-setting"
            options={options}
            name="setting"
            itemRef={register({
              required: "Required",
            })}
          />
        </Field>
        {setting === options[0].value && (
          <Field>
            <Input
              className="interval-duration"
              type="number"
              label={options[0].label}
              name="interval_duration"
              itemRef={register({
                required: true,
              })}
            />
          </Field>
        )}
        {setting === options[1].value && (
          <Field>
            <RangeSetting
              control={control}
              register={register}
              errors={rangeErrors}
            />
          </Field>
        )}
        {setting === options[2].value && (
          <Field>
            <Input
              className="num-segments"
              type="number"
              label={options[2].label}
              name="no_of_segments"
              itemRef={register({
                required: true,
              })}
            />
          </Field>
        )}
        {isRangeError && (
          <Text>End duration timing cannot be greater than start in Range</Text>
        )}
        {error && <Text>Something went wrong please try again.</Text>}

        <Button
          disabled={
            Object.keys(errors).length > 0 ||
            initialRender ||
            loading ||
            isFormValid(getValues())
          }
          type="submit"
          className="process-video"
        >
          SEGMENT VIDEO
          {loading && <LoadingIcon>refresh</LoadingIcon>}
        </Button>
      </Form>
    </Wrapper>
  );
};

export default AddVideo;
