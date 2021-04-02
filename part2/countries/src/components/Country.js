import React from 'react'

const Country = ({country, handler}) => {
  return (
    <p>
      {country.name} <button onClick={handler} value={country.name}>show</button>
    </p>
  )
}

export default Country