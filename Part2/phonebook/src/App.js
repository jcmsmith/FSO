import { useState } from 'react'

const Entry = ({name, number}) => <li>{name} {number}</li>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ]) 
  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const handlePersonChange = (event) => {
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

    setPersons(persons.concat({name: newName, number: newNumber}))
    setNewName('')
    setNewNumber('')
  } 

  const handleNumberChange = (event) => {
    console.log('handle number change: ', event.target.value)
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addEntry}>
        <div>
          name: 
          <input value={newName} onChange={handlePersonChange} />
        </div>
        <div>
          number:
          <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        <ul>
          {persons.map((person) => 
          <Entry key={person.name} name={person.name} number={person.number} />
          )}
        </ul>
      </div>
    </div>
  )
}

export default App