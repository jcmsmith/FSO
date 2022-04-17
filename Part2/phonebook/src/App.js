import { useState } from 'react'

const Entry = ({name}) => <li>{name}</li>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handlePersonChange = (event) => {
    console.log('handlePersonChange: ', event.target.value)
    setNewName(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.some((person) => person.name === newName))
    {
      window.alert(`${newName} is already added to phonebook!`)
      console.log(`${newName} is already added to phonebook!`)
      return
    }

    setPersons(persons.concat({name: newName}))
    setNewName('')
  } 

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: 
          <input value={newName} onChange={handlePersonChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        <ul>
          {persons.map((person) => 
          <Entry key={person.name} name={person.name} />
          )}
        </ul>
      </div>
    </div>
  )
}

export default App