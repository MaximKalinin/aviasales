import * as React from 'react';
import styled, { keyframes } from 'styled-components';

const loaderAnim = keyframes`
  from {
    transform:translateX(0) translateZ(0)
  }
  to {
    transform:translateX(-56px) translateZ(0)
  }
`;

const Loader = styled.div`
  height: 5px;
  width: 120%;
  transform: skewX(15deg);
  display: flex;
  overflow: hidden;
  margin-top: 2px;
  background: repeating-linear-gradient(135deg,#90caf9,#90caf9 20px,#2196f3 0,#2196f3 40px);
  overflow: hidden;
  animation: ${loaderAnim} .5s infinite linear;
  & > div {
    width: 20px;
    height: 100%;
  }
  & > div:nth-child(odd) {
    background: blue;
  }
  & > div:nth-child(even) {
    background: red;
  }
`;

export default Loader;