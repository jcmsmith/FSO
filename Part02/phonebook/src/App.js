import { useState, useEffect } from 'react'

import entryService from './services/EntryService'
import Entries from './components/Entries'
import EntryForm from './components/EntryForm'
import Message from './components/Message'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [messageIsError, setMessageIsError] = useState(false)


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

    let noteToChange = persons.find((person) => person.name === newName)

    if (noteToChange) {
      let confirm = window.confirm(`${newName} is already added to phonebook, replace the current number with a new one?`)

      if (confirm) {
        const newEntry = {...noteToChange, number: newNumber}

        entryService
        .updateEntry(newEntry)
        .then((returnedPerson) => {
          handleMessageDisplay(`Phonebook entry for ${newName}  updated!`, 3000, false)

          setPersons(persons.map((person) => {
            return person.id !== newEntry.id ? person : returnedPerson
          }))

          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          handleMessageDisplay(`Error! The entry you are trying to update does not exist!`, 5000, true)
        })
      }
      return
    }

    const newEntry = {name: newName, number: newNumber, id: persons.length + 1}

    entryService
      .addEntry(newEntry)
      .then(() => {
        handleMessageDisplay(`${newName} added to phonebook!`, 3000, false)
        setPersons(persons.concat(newEntry))
        setNewName('')
        setNewNumber('')
      })
  }
  
  const handleMessageDisplay = (text, time, isError) => {
    setMessageIsError(isError)
    setMessage(text)
    setTimeout(() => {
      setMessage(null)
      setMessageIsError(false)
    }, time)
  }

  const handleNumberChange = (event) => {
    console.log('handle number change: ', event.target.value)
    setNewNumber(event.target.value)
  }

  const handleDeleteButton = (id) => {
    if (window.confirm(`Are you sure you wish to delete this entry?`))
    {
      console.log('deleting entry:', id)
      entryService.deleteEntry(id)

      setPersons(
        persons.filter(
          (person) => person.id !== id)
      )
    }
  }

  const handleFilterChange = (event) => setFilter(event.target.value)

  const entriesToShow = persons.filter(
  (person) => 
    person.name
    .toLowerCase()
    .includes(filter.toLowerCase())
  )

  useEffect(getPersons, [])

  return (
    <>
      <h2>Phonebook</h2>
      <div>
        filter shown entries by name:  
        <input value={filter} onChange={handleFilterChange} />
      </div>

      <h2>Add new entry</h2>
      <Message msg={message} isError={messageIsError} />
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