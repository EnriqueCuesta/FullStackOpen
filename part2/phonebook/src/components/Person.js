import React from 'react'

const Person = ({person, handleDeletePerson}) => {
  return (
    <p>
      {person.name} {person.number}  <button type="button" id={person.id} onClick={handleDeletePerson}>Delete</button> 
    </p>
  )
}

export default Person