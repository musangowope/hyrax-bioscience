import React from "react";
import styled from "styled-components";
import BlockLoader from "./BlockLoader";

const Loader = () => (
  <S.ContentPlaceholderLoader>
    <BlockLoader />
  </S.ContentPlaceholderLoader>
);

const ContentPlaceholderLoader = () => {
  return (
    <div>
      <Loader />
      <Loader />
      <Loader />
    </div>
  );
};

export default ContentPlaceholderLoader;

const S = {};
S.ContentPlaceholderLoader = styled.div`
  .block-loader {
    height: 10px;
  }
  margin-bottom: 10px;
`;
