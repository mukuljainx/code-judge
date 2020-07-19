import * as React from "react";
import { useFieldArray, UseFormMethods } from "react-hook-form";
import styled from "styled-components";

import Input from "../../components/input";
import Button from "../../components/button";

const Field = styled.div`
  &:not(:last-child) {
    margin-bottom: 16px;
  }
`;

const Flex = styled.div`
  display: flex;
`;

interface IProps {
  register: UseFormMethods["register"];
  control: UseFormMethods["control"];
  errors: boolean[];
}

const RangeSetting = ({ register, control, errors }: IProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "range",
  });

  return (
    <Field>
      {fields.map((item, index) => (
        <Field key={item.id}>
          <Flex id={`range-row-${index}`}>
            <Input
              error={errors[index]}
              className={`range-duration-start-${index + 1}`}
              style={{ marginRight: 8 }}
              type="number"
              label="Start"
              name={`range[${index}].start`}
              itemRef={register({ required: true })}
            />
            <Input
              error={errors[index]}
              className={`range-duration-end-${index + 1}`}
              style={{ marginRight: 8 }}
              type="number"
              label="End"
              name={`range[${index}].end`}
              itemRef={register({ required: true })}
            />
            <Button
              className={`delete-range-duration-${index + 1}`}
              onClick={() => remove(index)}
            >
              Delete
            </Button>
          </Flex>
        </Field>
      ))}
      <Button
        className="add-range-duration"
        type="button"
        onClick={() => append({ name: "range" })}
      >
        Add Range Duration
      </Button>
    </Field>
  );
};

export default React.memo(RangeSetting);
