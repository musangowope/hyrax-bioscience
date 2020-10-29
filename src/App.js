import React from "react";
import useAxios from "./custom-hooks/useAxios";
import { api } from "./constants/api";
import CountryCard from "./components/CountryCard";
import styled, { css } from "styled-components";
import debounced from "./functions/debounced.func";
import Themed from "./functions/themed";
import BlockLoader from "./components/BlockLoader";
import { hasValue } from "./functions/hasValue.func";
import Paginator from "./components/Paginator";

const debounceBuilder = debounced(200);

const loaderProps = {
  width: "100%",
  height: "351px",
};

const Loader = () => (
  <React.Fragment>
    <BlockLoader {...loaderProps} />
    <BlockLoader {...loaderProps} />
    <BlockLoader {...loaderProps} />
    <BlockLoader {...loaderProps} />
  </React.Fragment>
);

const getQueryParamsObj = (searchCountryName, sortFilter, pageNumber) => {
  return {
    "page[size]": 10,
    "page[number]": pageNumber,
    ...(hasValue(searchCountryName)
      ? {
          "filter[name]": searchCountryName,
        }
      : {}),
    ...(hasValue(sortFilter)
      ? {
          sort: sortFilter,
        }
      : {}),
  };
};

const App = () => {
  const [searchCountryName, setSearchCountryName] = React.useState("");
  const [sortFilter, setSortFilter] = React.useState("");
  const [pageNumber, setPageNumber] = React.useState(1);

  const queryParamsObj = getQueryParamsObj(
    searchCountryName,
    sortFilter,
    pageNumber
  );

  const {
    loading,
    success,
    failed,
    response: { data: countries, meta: { total_pages = 0 } = {} } = {},
  } = useAxios(api.getCountries(queryParamsObj), "get", null, 300);

  const handleSearchInputChange = (e) => {
    e.preventDefault();
    debounceBuilder(() => setSearchCountryName(e.target.value));
  };

  const handleSortChange = (e) => {
    e.preventDefault();
    setSortFilter(e.target.value);
  };

  React.useEffect(() => {
    setPageNumber(1);
  }, [searchCountryName, sortFilter]);

  const renderCountries = () => {
    if (countries && countries.length) {
      return countries.map(
        ({ id, attributes: { name, capital, code, population } }) => (
          <CountryCard
            population={population}
            code={code}
            capital={capital}
            name={name}
            id={id}
            key={id}
          />
        )
      );
    }
    return <div>No countries available</div>;
  };

  return (
    <S.AppWrapper>
      <S.Header>
        <S.Title>Country List</S.Title>
        <S.HeaderContent>
          <S.SearchInput
            placeholder="Type country name"
            onChange={handleSearchInputChange}
          />
          <S.SortLabel>Sort By:</S.SortLabel>
          <S.SortSelect defaultValue="" onChange={handleSortChange}>
            <option value="" disabled>
              Sort by name or population
            </option>
            <option value="name">Name</option>
            <option value="population">Population</option>
          </S.SortSelect>
        </S.HeaderContent>
      </S.Header>
      <S.Container>
        {failed && <div>Could not load data</div>}
        <S.CountryListGrid>
          {loading && <Loader />}
          {success && renderCountries()}
        </S.CountryListGrid>
      </S.Container>

      <S.PaginatorWrapper>
        <Paginator
          isDataLoading={loading}
          currentPageNumber={pageNumber}
          totalPages={total_pages}
          onPageChange={(newPageNumber) => setPageNumber(newPageNumber)}
        />
      </S.PaginatorWrapper>
    </S.AppWrapper>
  );
};

const S = {};

S.AppWrapper = styled.div`
  padding-bottom: ${(props) => props.theme.marginPaddings[10]};
  position: relative;
`;

S.CountryListGrid = styled.div`
  grid-gap: 10px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;

  @media screen and (max-width: ${(props) => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: ${(props) => props.theme.breakpoints.sm}) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

S.Container = styled.div`
  max-width: ${(props) => props.theme.breakpoints.lg};
  margin-left: auto;
  margin-right: auto;
  @media screen and (max-width: ${(props) => props.theme.breakpoints.md}) {
    padding-left: ${(props) => props.theme.marginPaddings[1]};
    padding-right: ${(props) => props.theme.marginPaddings[1]};
  }
`;

S.Header = styled.div`
  text-align: center;
  padding: 20px 20px 40px;
  position: sticky;
  top: 0;
  background-color: #293241;
  color: white;
  z-index: 99;
  margin-bottom: ${(props) => props.theme.marginPaddings[3]};
`;

S.HeaderContent = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: ${(props) => props.theme.breakpoints.md}) {
    display: block;
  }
`;

S.Title = styled.h1`
  font-size: ${(props) => props.theme.fontSizes[6]};
  margin-bottom: ${(props) => props.theme.marginPaddings[2]};
`;

const inputStyles = css`
  padding: 10px;
  border: none;
  box-shadow: none;
  background-color: white;
`;

S.SearchInput = styled.input`
  ${inputStyles};
  max-width: 300px;
  width: 100%;
  margin-right: 10px;

  @media screen and (max-width: ${(props) => props.theme.breakpoints.md}) {
    margin-bottom: 10px;
    margin-right: 0;
    max-width: 100%;
  }
`;

S.SortLabel = styled.div`
  margin-right: 10px;
  font-size: 16px;

  @media screen and (max-width: ${(props) => props.theme.breakpoints.md}) {
    margin-bottom: 10px;
  }
`;

S.SortSelect = styled.select`
  ${inputStyles};
  @media screen and (max-width: ${(props) => props.theme.breakpoints.md}) {
    width: 100%;
  }
`;

S.PaginatorWrapper = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: white;
  text-align: center;
  height: 58px;
`;
export default Themed(App);
