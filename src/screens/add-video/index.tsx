import * as React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";

import { ScreenType } from "../../interfaces";
import RangeSetting from "./rangeSetting";
import Input from "../../components/input";
import Button from "../../components/button";
import Select from "../../components/select";
import Card from "../../components/card";

const Wrapper = styled.div`
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: gray;
  height: 100%;
`;

const Form = styled.form``;

const Field = styled.div`
  margin-bottom: 16px;
`;

const Text = styled.p``;

interface IProps {
  changeScreen: (screen: ScreenType) => void;
}

const options = [
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
  range: Array<{ start: string; end: string }>;
};

let initialRender = true;

const AddVideo = (props: IProps) => {
  const { handleSubmit, register, control, watch, errors, getValues } = useForm<
    FormValues
  >({
    mode: "onBlur",
  });

  const setting = watch("setting", options[0].value);
  console.log(getValues());
  const rangeErrors: boolean[] = (getValues().range || []).map(
    (row) => parseInt(row.start, 10) > parseInt(row.end, 10)
  );
  const isRangeError = rangeErrors.find((row) => row);

  const onSubmit = handleSubmit((data) => console.log(data));

  React.useEffect(() => {
    initialRender = false;
  }, []);

  React.useEffect(() => {
    if (isRangeError) {
      const index = rangeErrors.findIndex((row) => row);
      document.querySelector(`range-row-${index}`)?.scrollIntoView();
    }
  });

  console.log(errors);
  return (
    <Wrapper>
      <Card height="80%" width="50%">
        <Form onSubmit={onSubmit}>
          <Field>
            <Input
              className="video-link"
              label="Video Link"
              name="link"
              itemRef={register({
                required: "Required",
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
                name={options[0].value}
                itemRef={register({
                  required: "Required",
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
                name={options[2].value}
                itemRef={register({
                  required: "Required",
                })}
              />
            </Field>
          )}
          {rangeErrors.find((row) => row) && (
            <Text>End Value cannot be greater than start in Range</Text>
          )}
          <Button
            disabled={
              Object.keys(errors).length > 0 ||
              initialRender ||
              rangeErrors.find((row) => row)
            }
            type="submit"
            className="process-video"
          >
            SEGMENT VIDEO
          </Button>
        </Form>
      </Card>
    </Wrapper>
  );
};

export default AddVideo;
