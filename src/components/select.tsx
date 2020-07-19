import * as React from "react";
import styled from "styled-components";

type SelectProps = Omit<JSX.IntrinsicElements["select"], "ref">;

const Option = styled.option``;

const StyledSelect = styled.select`
  height: 42px;
  padding: 0 8px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: black;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.light};
`;

interface IProps extends SelectProps {
  itemRef: any;
  options: Array<{
    label: string;
    value: string;
  }>;
}

const Select = ({ itemRef, options, ...props }: IProps) => {
  return (
    <StyledSelect {...props} ref={itemRef}>
      {options.map((option) => (
        <Option key={option.value} value={option.value}>
          {option.label}
        </Option>
      ))}
    </StyledSelect>
  );
};

export default Select;
