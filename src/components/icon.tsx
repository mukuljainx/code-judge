import styled from "styled-components";
import { ThemeType } from "../theme";

const Icon = styled.i.attrs({ className: "material-icons" })<{
  color?: keyof ThemeType["colors"];
}>`
  font-size: 20px;
  ${({ color, theme }) => color && `color: ${theme.colors[color]}`};
`;

export default Icon;
