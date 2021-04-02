
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Filter from './components/Filter'
import Result from './components/Result'

const App = () => {
  const [ countries, setCountries ] = useState([]) 
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])
  console.log('render', countries.length, 'countries')



  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const countriesFiltered = filter ? countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase())) : countries

  return (
    <div>
      <Filter filter={filter} handler={handleFilterChange} />
      <Result countries={countriesFiltered} handler={handleFilterChange} />
    </div>
  )
}

export default App