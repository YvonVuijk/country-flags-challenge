import React, { createContext } from 'react';
import { useQuery } from "react-query";

import { Country } from "../types/Country";

interface ContextProps {
  data?: Array<Country>;
  isLoading: Boolean;
}

interface CountryContextProps {
  children: React.ReactNode
}

export const CountryContext = createContext({} as ContextProps);

const CountryContextProvider = (props: CountryContextProps) => {
  const fetchCountries = () =>
    fetch("https://restcountries.eu/rest/v2/all").then((res) => res.json())

  const { data, isLoading } = useQuery(
    "countries",
    fetchCountries
  );

  const contextValues = {
    data,
    isLoading,
  };

  return (
    <CountryContext.Provider value={contextValues} >
      {props.children}
    </CountryContext.Provider>
  );
};

export default CountryContextProvider;
