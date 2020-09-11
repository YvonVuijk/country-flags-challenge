import React from 'react';
import { Link, useParams } from "react-router-dom";
import { useQuery } from "react-query";

import { Country } from "../types/Country";

import { formatNumber } from '../helpers/utilities';

import Grid from '@material-ui/core/Grid';

import BackButton from '../components/BackButton';

type SinglePageProps = {
  countryMap?: { [key: string]: string };
}

const SinglePage: React.FC<SinglePageProps> = ({ countryMap }: SinglePageProps) => {
  const { id } = useParams();
  const { data: country, isLoading } = useQuery<Country>(id, fetchCountry);

  return (
    <>
      <div>
        <BackButton />
      </div>

      {country && !isLoading && (

        <Grid container spacing={3}>

          <Grid item xs={6}>
            <img
              src={country.flag}
              alt={`Flag of ${country.name}`}
            />
          </Grid>

          <Grid item xs={6}>

            <h1>{country.name}</h1>

            <Grid container>
              <Grid item xs={6}>
                <Field name="Native Name" value={country.nativeName} />
                <Field name="Population" value={formatNumber(country.population)} />
                <Field name="Region" value={country.region} />

                {country.subregion && (
                  <Field name="Sub Region" value={country.subregion} />
                )}
                {country.capital && (
                  <Field name="Capital" value={country.capital} />
                )}
              </Grid>

              <Grid item xs={6}>
                <Field name="Top Level Domain" value={country.topLevelDomain} />
                <Field
                  name="Currencies"
                  values={country.currencies?.map(
                    (e) => `${e.symbol} (${e.name})`
                  )}
                />
                <div>
                  <strong>Languages: </strong>
                  {country.languages?.map(
                    (e, i) => <span key={i}>{e.name}</span>
                  )}
                </div>
              </Grid>
            </Grid>

            <Grid container>
              <Grid item xs={12}>
                {country.borders && country.borders.length > 0 ? (
                  <>
                    <strong>Border Countries: </strong>
                    {country.borders.map((e, i) => (
                      <Link to={`/countries/${e}`} key={i}>
                        {countryMap ? countryMap[e] : e}
                      </Link>
                    ))}
                  </>
                ) : (
                    <>
                      <strong>No border countries</strong>
                    </>
                  )}
              </Grid>
            </Grid>

          </Grid>
        </Grid>

      )}
    </>
  );
};

export default SinglePage;

type FieldProps = {
  name: string;
  value?: string;
  values?: string[];
};
const Field = ({ name, value, values }: FieldProps) => (
  <div>
    <strong>{name}: </strong>
    {values ? values.join(" · ") : value}
  </div>
);

const fetchCountry = async (id: string) =>
  (
    await fetch(
      `https://restcountries.eu/rest/v2/alpha?codes=${id}`
    ).then((res) => res.json())
  )[0];