import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import SimpleModal from "./SimpleModal";
import CountryDetails from "./CountryDetails";
import { hasValue } from "../functions/hasValue.func";
import Themed from "../functions/themed";

const CountryCard = ({ name, capital, code, population, id }) => {
  const [idState, setIdState] = React.useState(null);

  const closeDetailModal = () => setIdState(null);

  return (
    <div>
      <S.CardContainer>
        <S.CardImage src={`svgs/flags/${code.toLowerCase()}.svg`} alt={code} />
        <S.CardContent>
          <div>{name}</div>
          <div>{capital}</div>
          <div>{code}</div>
          <div>{population}</div>
        </S.CardContent>
        <S.Button type="button" onClick={() => setIdState(id)}>
          View Country Details
        </S.Button>
      </S.CardContainer>
      <SimpleModal isOpen={hasValue(idState)} closeAction={closeDetailModal}>
        <S.ModalHeaderWrapper>
          <S.ModalTitle>{name} Details:</S.ModalTitle>
          <S.CloseBtn onClick={closeDetailModal}>Close</S.CloseBtn>
        </S.ModalHeaderWrapper>
        <S.CountryDetailWrapper>
          <CountryDetails id={idState} />
        </S.CountryDetailWrapper>
      </SimpleModal>
    </div>
  );
};

CountryCard.propTypes = {
  name: PropTypes.string,
  capital: PropTypes.string,
  code: PropTypes.string,
  population: PropTypes.number,
  id: PropTypes.number,
};
CountryCard.defaultProps = {
  name: "",
  capital: "",
  code: "",
};

export default Themed(CountryCard);

const S = {};

S.CardContainer = styled.div`
  position: relative;
  text-align: center;
  border: 2px solid;
  padding: ${(props) => props.theme.marginPaddings[2]};
  height: 100%;
  background-color: white;
`;

S.CardContent = styled.div`
  margin-bottom: ${(props) => props.theme.marginPaddings[2]};
`;

S.CardImage = styled.img`
  width: 150px;
  height: 150px;
  object-fit: contain;
  object-position: center;
`;

S.Button = styled.button`
  padding: 10px 20px;
  background-color: #3d5a80;
  border: none;
  color: white;
  text-transform: uppercase;
`;

S.CountryDetailWrapper = styled.div`
  padding: ${(props) => props.theme.marginPaddings[2]};
`;

S.ModalTitle = styled.div`
  font-size: ${(props) => props.theme.fontSizes[4]};
`;

S.ModalHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-flow: row wrap;
  justify-content: space-between;
  margin-bottom: 5px;
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  background-color: white;
  padding: ${(props) => props.theme.marginPaddings[1]};
`;

S.CloseBtn = styled.button`
  background-color: #3d5a80;
  color: white;
  border: none;
`;
