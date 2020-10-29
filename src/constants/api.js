import { hasValue } from "../functions/hasValue.func";

const baseCountriesUrl =
  "http://ec2-34-249-218-118.eu-west-1.compute.amazonaws.com:3000";

const generateRequestUrl = (queryParamsObj = {}) => {
  const queryParamString = Object.keys(queryParamsObj)
    .map((propName) => `${propName}=${queryParamsObj[propName]}`)
    .join("&");

  return `${baseCountriesUrl}/countries?${queryParamString}`;
};

export const api = {
  getCountries: (queryParamsObj = {}) => generateRequestUrl(queryParamsObj),
  getCountry: (id) =>
    hasValue(id) ? `${baseCountriesUrl}/countries/${id}` : "",
};
