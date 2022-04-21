import { useState, useEffect } from 'react'

import entryService from './services/EntryService'
import Entries from './components/Entries'
import EntryForm from './components/EntryForm'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const getPersons = () => {
    entryService
      .getAllEntries()
      .then(response => setPersons(response))
  }

  

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

    const newEntry = {name: newName, number: newNumber, id: persons.length + 1}

    entryService.addEntry(newEntry)

    setPersons(persons.concat(newEntry))
    setNewName('')
    setNewNumber('')
  } 

  const handleNumberChange = (event) => {
    console.log('handle number change: ', event.target.value)
    setNewNumber(event.target.value)
  }

  const handleDeleteButton = (id) => {
    console.log('deleting entry:', id)
    entryService.deleteEntry(id) 
    entryService
      .getAllEntries()
      .then((entries) => setPersons(entries))
  }

  const handleFilterChange = (event) => setFilter(event.target.value)

  const entriesToShow = persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))

  useEffect(getPersons, [])

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
      <Entries 
        entriesToShow={entriesToShow} 
        deleteEntryHandler={handleDeleteButton} 
      />
    </>
  )
}

export default App