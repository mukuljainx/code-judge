import styled, { keyframes } from "styled-components";

import Icon from "../components/icon";

const rotation = keyframes`
from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
`;

const LoadingIcon = styled(Icon)`
  animation: ${rotation} 2s infinite linear;
`;

export default LoadingIcon;
