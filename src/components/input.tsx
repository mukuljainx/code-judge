import * as React from "react";
import styled from "styled-components";

type InputProps = Omit<JSX.IntrinsicElements["input"], "ref">;

const Span = styled.span``;

const StyledInput = styled.input`
  display: block;
  width: 100%;
  padding: 8px 16px;
  line-height: 25px;
  font-size: 14px;
  font-weight: 500;
  font-family: inherit;
  border-radius: 4px;
  -webkit-appearance: none;
  color: ${({ theme }) => theme.colors.black};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.white};
  transition: border 0.3s ease;
  &::placeholder {
    color: ${({ theme }) => theme.colors.background};
  }
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const Wrapper = styled.div<{ error?: boolean }>`
  position: relative;
  display: flex;
  width: 100%;
  ${Span},
  ${StyledInput} {
    white-space: nowrap;
    display: block;
    &:not(:first-child):not(:last-child) {
      border-radius: 0;
    }
    &:first-child {
      border-radius: 4px 0 0 4px;
    }
    &:last-child {
      border-radius: 0 4px 4px 0;
    }
    &:not(:first-child) {
      margin-left: -1px;
    }
  }
  ${StyledInput} {
    position: relative;
    z-index: 1;
    flex: 1 1 auto;
    width: 1%;
    margin-top: 0;
    margin-bottom: 0;
  }
  ${Span} {
    text-align: center;
    padding: 8px 12px;
    font-size: 14px;
    line-height: 25px;
    color: ${({ theme }) => theme.colors.dark};
    background: ${({ theme }) => theme.colors.light};
    border: 1px solid ${({ theme }) => theme.colors.border};
    transition: background 0.3s ease, border 0.3s ease, color 0.3s ease;
  }
  &:focus-within {
    ${Span} {
      color: ${({ theme }) => theme.colors.white};
      background: ${({ theme }) => theme.colors.primary};
      border-color: ${({ theme }) => theme.colors.primary};
    }
  }

  ${StyledInput} {
    ${({ error, theme }) => error && `border-color: ${theme.colors.alert}`}
  }
`;

interface IProps extends InputProps {
  label: string;
  itemRef: any;
  error?: boolean;
}

const Input = ({ label, itemRef, error, height, width, ...rest }: IProps) => {
  return (
    <Wrapper error={error} style={{ height, width }}>
      <Span>{label}</Span>
      <StyledInput {...rest} ref={itemRef as any} />
    </Wrapper>
  );
};

export default Input;
