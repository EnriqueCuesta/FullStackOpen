import React from 'react'
import CityWeather from './CityWeather'

const CountryDetails = ({country}) => {
  return (
    <>
      <h1>{country.name}</h1>
      <p>
        capital {country.capital} <br/>
        population {country.population}
      </p>
      <h2>Languages</h2>
      <ul>
        {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img width="150" src={country.flag} alt={country.name+' flag'}></img>
      <CityWeather city={country.capital} />
    </>
  )
}

export default CountryDetails