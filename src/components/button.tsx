import styled from "styled-components";

const Button = styled.button`
  color: ${({ theme }) => theme.colors.white};
  background: ${({ theme }) => theme.colors.primary};
  height: 42px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;

  &:disabled {
    opacity: 0.3;
  }
`;

export default Button;
