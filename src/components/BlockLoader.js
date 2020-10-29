import React from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";
import { transparentize } from "polished";

const BlockLoader = ({
  width,
  height,
  primaryLoadingClr,
  secondaryLoadingClr,
}) => {
  return (
    <StyledLoaderAnimation
      className="block-loader"
      width={width}
      height={height}
      primaryLoadingClr={primaryLoadingClr}
      secondaryLoadingClr={secondaryLoadingClr}
    />
  );
};

const LoaderAnimation = keyframes`
0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
`;

const StyledLoaderAnimation = styled.div`
  background-color: ${(props) => props.primaryLoadingClr};
  position: relative;
  overflow: hidden;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  &::after {
    content: "";
    display: block;
    background-color: ${(props) => props.secondaryLoadingClr};
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    transform: translateX(0);
    animation: 1.5s ${LoaderAnimation} ease-in-out infinite;
  }
`;

export default BlockLoader;

BlockLoader.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  primaryLoadingClr: PropTypes.string,
  secondaryLoadingClr: PropTypes.string,
};

BlockLoader.defaultProps = {
  width: "100%",
  height: "100%",
  primaryLoadingClr: transparentize(0.7, "#605d5b"),
  secondaryLoadingClr: transparentize(0.7, "#949494"),
};
