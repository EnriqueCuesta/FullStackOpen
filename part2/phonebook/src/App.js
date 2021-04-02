import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/Persons'

import './index.css'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ message, setMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
    }, [])
    console.log('render', persons.length, 'persons')

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    var found = persons.find(person => person.name === newName)

    if(found) {
      var result = window.confirm(`${found.name} is already added to phonebook, replace the old number with the new one?`)
      if(result) {
        personService
          .update(found.id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id === found.id ? returnedPerson : person).sort((a, b) => {
              let nameA = a.name.toLowerCase()
              let nameB = b.name.toLowerCase()
              if (nameA > nameB) {
                return 1;
              }
              if (nameA < nameB) {
                return -1;
              }
              return 0;
            }))
            notify(`${found.name} has been updated.`, "info")
          })
          .catch(error => notify(`Information of ${personObject.name} has already been removed from server.`, "error"))
      }
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson).sort((a, b) => {
            let nameA = a.name.toLowerCase()
            let nameB = b.name.toLowerCase()
            if (nameA > nameB) {
              return 1;
            }
            if (nameA < nameB) {
              return -1;
            }
            return 0;
          }))
          notify(`${personObject.name} has been added.`, "info")
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (event) => {
    var person = persons.find(person => person.id == event.target.id)
    var result = window.confirm(`Delete ${person.name} ?`)
    if(result) {
      personService
        .deleteEntry(person.id)
        .then(() => {
          setPersons(persons.filter(pf => pf.id !== person.id ).sort((a, b) => {
            let nameA = a.name.toLowerCase()
            let nameB = b.name.toLowerCase()
            if (nameA > nameB) {
              return 1;
            }
            if (nameA < nameB) {
              return -1;
            }
            return 0;
          }))
          notify(`${person.name} has been deleted.`, "info")
        })
        .catch(error => notify(`Information of ${person.name} has already been removed from server.`, "error"))
    }
  }

  const notify = (text, type) => {
    console.log(type, text)
    setMessage({text, type})
    setTimeout(() => {
      setMessage(null)
    }, 2000)
  }

  const personsFiltered = filter ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())) : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter filter={filter} handler={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm submitHandler={addPerson} name={newName} handleNameChange={handleNameChange} number={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={personsFiltered} handleDeletePerson={deletePerson} />
    </div>
  )
}

export default App