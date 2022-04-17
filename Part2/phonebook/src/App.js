import { useState } from 'react'

const Entry = ({name, number}) => <li>{name} {number}</li>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

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

  console.log('filter:', filter)

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown entries by name:  
        <input value={filter} onChange={handleFilterChange} />
      </div>
      <h2>Add new entry</h2>
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
          {entriesToShow.map((person) => 
          <Entry key={person.id} name={person.name} number={person.number} />
          )}
        </ul>
      </div>
    </div>
  )
}

export default App