import { useState } from 'react'
import Person from './components/Persons'


const App = (props) => {


  const [persons, setPersons] = useState(props.persons)

  const [newName, setNewName] = useState('')
  



  const addName = (event) => {

    const personsObject = {
      name: newName,
      id: persons.length + 1,
    }
   

    event.preventDefault()
    if( (persons.map(element => element.name).includes(newName)) === true ){
        return alert( `${newName} is a duplicate`)

    }else {
    setPersons(persons.concat(personsObject))
    setNewName('')
    console.log(persons.map(element => element.name).includes(newName))
    console.log(persons)
    }
  }

  const handleNameChange = (event) => {
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

        {persons.map(person =>
          <Person person={person} key={person.id} />
        )}

      </div>
    
  
    </div>
  )
}

export default App