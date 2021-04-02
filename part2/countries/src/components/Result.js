import React from 'react'
import Country from './Country'
import CountryDetails from './CountryDetails'

const Result = ({countries, handler}) => {
  if (countries.length === 1) {
    return (
      <>
        <CountryDetails key={countries[0].name} country={countries[0]} />
      </>
    )
  } else {
    if (countries.length > 10) {
      return (
        <>
          Too many matches, specify another filter
        </>
      )
    } else {
      return (
        <>
          {countries.map(country => <Country key={country.name} country={country} handler={handler} /> )}
        </>
      )
    }
  }
}

export default Result