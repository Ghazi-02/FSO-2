import { useState } from 'react'
import Person from './components/Persons'


const App = (props) => {


  const [persons, setPersons] = useState(props.persons)

  const [newName, setNewName] = useState('')

  const [newNumbers, setNewNumbers] = useState('')

  const [showAll, setShowAll] = useState('false')



  const personsToShow = showAll 
  ? persons.filter(element => element.name.toUpperCase().includes(showAll.toUpperCase()))
  : persons

  const addName = (event) => {
    event.preventDefault()
    const personsObject = {
      name: newName,
      id: persons.length + 1,
      number: newNumbers,
    }




    if ((persons.map(element => element.name).includes(newName)) === true) {
      return alert(`${newName} is a duplicate`);

    } else {

      setPersons(persons.concat(personsObject))
      setNewName('')
      setNewNumbers('')
      console.log(personsObject)
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumbers(event.target.value)
  }
  const handleFilterChange = (event) => {
    setShowAll(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with <input value={showAll} onChange={handleFilterChange} />
      <form onSubmit={addName}>
        <h2>add a new</h2>
        <div>


          name: <input value={newName} onChange={handleNameChange} />
          <div>
            number: <input value={newNumbers} onChange={handleNumberChange} />
          </div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>



        <h2>Numbers</h2>

      </form>
      {personsToShow.map(person =>
        <Person person={person} number={person.numbers} key={person.id} />
      )}

    </div>



  )
}

export default App