import { useState } from 'react'
import Person from './components/Persons'


const App = (props) => {
 
  
  const [persons, setPersons] = useState(props.persons)
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    console.log("button clicked", event.target)
    const personsObject = {
      name: newName,
      id: persons.length + 1,
    }
    setPersons(persons.concat(personsObject))
    setNewName('')
    console.log("new name", newName)
    console.log("persons is", persons)

  }



  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
     
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
    <div>
  {console.log("persons2",persons)}
        {persons.map(person => 
          <Person person={person} key={person.id} />
        )}</div>
    </div>
  )
}

export default App