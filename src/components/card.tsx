import styled from "styled-components";

const Card = styled.div<Pick<React.CSSProperties, "width" | "height">>`
  ${({ width }) =>
    width && `width: ${typeof width === "string" ? width : `${width}px`}`};
  ${({ height }) =>
    height && `height: ${typeof height === "string" ? height : `${height}px`}`};
  background: white;
  padding: 16px;
  border-radius: 4px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  overflow-y: auto;

  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
`;

export default Card;
