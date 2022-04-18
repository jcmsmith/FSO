import { useState, useEffect } from 'react'
import axios from 'axios'


const Entries = ({entriesToShow}) => {
  return(
    <div>
      <ul>
        {entriesToShow.map((person) => 
          <Person key={person.id} name={person.name} number={person.number} />
        )}
      </ul>
    </div>
  )
}

const Person = ({name, number}) => <li>{name} {number}</li>

const EntryForm = ({onSubmit, nameValue, numberValue, nameChange, numberChange}) => {
  return(
    <form onSubmit={onSubmit}>
      <div>
        name:
        <input value={nameValue} onChange={nameChange} />
      </div>
      <div>
        number:
        <input value={numberValue} onChange={numberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const handleNameChange = (event) => {
    console.log('handlePersonChange: ', event.target.value)
    setNewName(event.target.value)
  }

  const addEntry = (event) => {
    event.preventDefault()

    if (persons.some((person) => person.name === newName))
    {
      window.alert(`${newName} is already added to phonebook!`)
      console.log(`${newName} is already added to phonebook!`)
      return
    }
    if (persons.some((person) => person.number === newNumber))
    {
      window.alert(`${newNumber} is already added to phonebook!`)
      console.log(`${newNumber} is already added to phonebook!`)
      return
    }

    setPersons(persons.concat({name: newName, number: newNumber, id: persons.length + 1}))
    setNewName('')
    setNewNumber('')
  } 

  const handleNumberChange = (event) => {
    console.log('handle number change: ', event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => setFilter(event.target.value)

  const entriesToShow = persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))

  const getPersonsHook = () => {
    console.log('starting getPersonsHook effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled - getting persons for initial state')
        setPersons(response.data)
      })
  }

  useEffect(getPersonsHook, [])

  return (
    <>
      <h2>Phonebook</h2>
      <div>
        filter shown entries by name:  
        <input value={filter} onChange={handleFilterChange} />
      </div>

      <h2>Add new entry</h2>
      <EntryForm 
        onSubmit={addEntry} 
        nameValue={newName} 
        numberValue={newNumber} 
        nameChange={handleNameChange} 
        numberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Entries entriesToShow={entriesToShow} />
    </>
  )
}

export default App