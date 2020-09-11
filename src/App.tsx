import React, { useEffect, useState } from 'react';
import { useQuery } from "react-query";

import { Country } from "./types/Country";
import style from "./App.module.scss";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from 'react-router-dom';

import ThemeToggle from './components/ThemeToggle';
import Home from './pages/Home';
import SinglePage from './pages/SinglePage';

export default function App() {
  const [countryMap, setCountryMap] = useState<{ [key: string]: string }>();

  const { data, isLoading, error } = useQuery<Country[]>(
    "countries",
    fetchCountries
  );

  useEffect(() => {
    if (!isLoading && !error && data) {
      const countryMap: { [key: string]: string } = {};
      for (const country of data) {
        if (!countryMap[country.alpha3Code]) {
          countryMap[country.alpha3Code] = country.name!;
        }
      }

      setCountryMap(countryMap);
    }
  }, [data, isLoading, error]);

  return (
    <Router>
      <div className={style.container}>

        <header className={style.header}>
          <div className={style.content}>
            <Link to='/'>Where in the world?</Link>

            <div>
              <ThemeToggle />
            </div>

          </div>
        </header>

        <div className={style.container}>
          <Switch>
            <Route path="/" exact >
              <Home countries={data} />
            </Route>
            <Route path="/countries/:id" >
              <SinglePage countryMap={countryMap} />
            </Route>
            <Redirect to="/" />
          </Switch>

        </div>

      </div>
    </Router>
  );
};

const fetchCountries = () =>
  fetch("https://restcountries.eu/rest/v2/all").then((res) => res.json())
