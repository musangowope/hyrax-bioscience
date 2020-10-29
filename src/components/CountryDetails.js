import React from "react";
import PropTypes from "prop-types";
import useAxios from "../custom-hooks/useAxios";
import { api } from "../constants/api";
import styled from "styled-components";
import Themed from "../functions/themed";
import Map from "./Map";
import ContentPlaceholderLoader from "./ContentPlaceholderLoader";

const CountryDetails = ({ id }) => {
  const {
    loading,
    success,
    failed,
    response: { data },
  } = useAxios(api.getCountry(id));

  return (
    <div className="country-details">
      {failed && <div>Could not load data</div>}
      {loading && <ContentPlaceholderLoader />}
      {success && (
        <div className="country-details__content">
          <S.DetailFactsWrapper>
            <S.FactItem>
              <S.FactItemTitle>Agriculture:</S.FactItemTitle>
              <div>{data.attributes.agriculture}</div>
            </S.FactItem>
            <S.FactItem>
              <S.FactItemTitle>Area:</S.FactItemTitle>
              <div>{data.attributes.area}</div>
            </S.FactItem>
            <S.FactItem>
              <S.FactItemTitle>Capital:</S.FactItemTitle>
              <div>{data.attributes.capital}</div>
            </S.FactItem>
            <S.FactItem>
              <S.FactItemTitle>Climate:</S.FactItemTitle>{" "}
              {data.attributes.climate}
            </S.FactItem>
            <S.FactItem>
              <S.FactItemTitle>Code:</S.FactItemTitle> {data.attributes.code}
            </S.FactItem>
            <S.FactItem>
              <S.FactItemTitle>Death Rate:</S.FactItemTitle>{" "}
              {data.attributes.birthday}
            </S.FactItem>
            <S.FactItem>
              <S.FactItemTitle>Capital:</S.FactItemTitle>{" "}
              {data.attributes.capital}
            </S.FactItem>
            <S.FactItem>
              <S.FactItemTitle>GDP:</S.FactItemTitle> {data.attributes.gdp}
            </S.FactItem>
            <S.FactItem>
              <S.FactItemTitle>Industry:</S.FactItemTitle>{" "}
              {data.attributes.industry}
            </S.FactItem>
            <S.FactItem>
              <S.FactItemTitle>Infant Morality:</S.FactItemTitle>{" "}
              {data.attributes.infant_morality}
            </S.FactItem>
            <S.FactItem>
              <S.FactItemTitle>Latitude:</S.FactItemTitle>{" "}
              {data.attributes.latitude}
            </S.FactItem>
            <S.FactItem>
              <S.FactItemTitle>Longitude:</S.FactItemTitle>{" "}
              {data.attributes.longitude}
            </S.FactItem>
            <S.FactItem>
              <S.FactItemTitle>Name:</S.FactItemTitle> {data.attributes.name}
            </S.FactItem>
            <S.FactItem>
              <S.FactItemTitle>Net Migration:</S.FactItemTitle>{" "}
              {data.attributes.net_migration}
            </S.FactItem>
            <S.FactItem>
              <S.FactItemTitle>Population:</S.FactItemTitle>{" "}
              {data.attributes.population}
            </S.FactItem>
            <S.FactItem>
              <S.FactItemTitle>Population Density:</S.FactItemTitle>{" "}
              {data.attributes.population_density}
            </S.FactItem>
            <S.FactItem>
              <S.FactItemTitle>Population Service;</S.FactItemTitle>{" "}
              {data.attributes.service}
            </S.FactItem>
            <S.FactItem>
              <S.FactItemTitle>Region:</S.FactItemTitle>{" "}
              {data.attributes.region}
            </S.FactItem>
          </S.DetailFactsWrapper>
          <Map
            center={{
              lat: data.attributes.latitude,
              lng: data.attributes.longitude,
            }}
          />
        </div>
      )}
    </div>
  );
};

CountryDetails.propTypes = {
  id: PropTypes.number,
};

export default Themed(CountryDetails);

const S = {};
S.DetailFactsWrapper = styled.div`
  margin-bottom: 20px;
`;

S.FactItem = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  border-bottom: 1px solid black;
  padding-bottom: 5px;
  padding-top: 5px;
`;

S.FactItemTitle = styled.div`
  font-weight: bold;
`;
