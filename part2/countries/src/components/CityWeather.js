import React, { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const CityWeather = ({city}) => {
  const [ wheather, setWheather ] = useState({}) 

  useEffect(() => {
    console.log('effect weather')
    axios
      .get('http://api.weatherstack.com/current?access_key='+api_key+'&query='+city)
      .then(response => {
        console.log('promise fulfilled')
        setWheather(response.data)
      })
  }, [city])
  console.log('render', wheather, 'wheathers')

  if (wheather.current) {
    return (
      <>
        <h2>Weather in {city}</h2>
        <p>
          temperature: {wheather.current.temperature} Celsius <br/>
          <img width="150" src={wheather.current.weather_icons[0]} alt="icon"></img><br/>
          wind: {wheather.current.wind_speed} kmph direcction {wheather.current.wind_dir}
        </p>
      </>
    )
  } else {
    return (
      <div/>
    )
  }
}

export default CityWeather