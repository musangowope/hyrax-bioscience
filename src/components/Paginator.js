import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import BlockLoader from "./BlockLoader";

const Paginator = ({
  totalPages,
  currentPageNumber,
  onPageChange,
  isDataLoading,
}) => {
  const buttonLinkIndices = Array.from(
    Array(totalPages),
    (x, index) => index + 1
  );

  const checkIfBetween = (min = 0, max = 0, value = 0) =>
    value >= min && value <= max;

  const renderButton = (index = 0) => {
    const min = currentPageNumber < 3 ? 1 : currentPageNumber - 2;
    const max =
      currentPageNumber === totalPages ? totalPages : currentPageNumber + 2;

    if (checkIfBetween(min, max, index)) {
      return (
        <S.PageButton
          disabled={currentPageNumber === index}
          key={index}
          onClick={() => onPageChange(index)}
        >
          {index}
        </S.PageButton>
      );
    }
    return null;
  };

  return (
    <S.LinksWrapper>
      {isDataLoading ? (
        <BlockLoader height="10px" width="300px" />
      ) : (
        <React.Fragment>
          {currentPageNumber > 1 && (
            <S.GoToFirstBtn onClick={() => onPageChange(1)}>
              First
            </S.GoToFirstBtn>
          )}
          {buttonLinkIndices.map((index) => renderButton(index))}
          {currentPageNumber < totalPages && (
            <S.GoToLastBtn onClick={() => onPageChange(totalPages)}>
              Last
            </S.GoToLastBtn>
          )}
        </React.Fragment>
      )}
    </S.LinksWrapper>
  );
};

Paginator.propTypes = {
  totalPages: PropTypes.number,
  currentPageNumber: PropTypes.number,
  onPageChange: PropTypes.func,
  isDataLoading: PropTypes.bool,
};
Paginator.defaultProps = {
  totalPages: 0,
  currentPageNumber: 0,
  onPageChange: () => false,
  isDataLoading: false,
};

export default Paginator;

const S = {};
S.LinksWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: row nowrap;
`;

S.PageButton = styled.button`
  background-color: transparent;
  border: 2px solid #ee6c4d;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 300ms ease-in-out;
  cursor: pointer;
  margin-left: 5px;
  margin-right: 5px;
  color: black;

  &:hover {
    background-color: #ee6c4d;
    color: white;
  }

  &:disabled {
    background-color: #ee6c4d;
    color: white;
    cursor: not-allowed;
  }
`;

const firstLastBtnStyles = css`
  background-color: transparent;
  border: 2px solid #ee6c4d;
  transition: ease-in-out 300ms;
  &:hover {
    background-color: #ee6c4d;
    color: white;
  }
`;

S.GoToFirstBtn = styled.button`
  ${firstLastBtnStyles};
  margin-right: 5px;
`;

S.GoToLastBtn = styled.button`
  ${firstLastBtnStyles};
  margin-left: 5px;
`;

// S.PaginatorLoaderWrapper = styled.div``;
