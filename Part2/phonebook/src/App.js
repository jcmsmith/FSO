import { useState } from 'react'

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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  
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

  console.log('filter:', filter)

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