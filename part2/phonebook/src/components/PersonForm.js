import React from 'react'

const PersonForm = ({submitHandler, name, handleNameChange, number, handleNumberChange}) => {
  return (
    <form onSubmit={submitHandler}>
      <div>
        name: <input value={name} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={number} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm