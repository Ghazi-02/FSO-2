
import { useState, useEffect } from 'react'
import Person from './components/Persons'
import personService from './services/persons'


const Notification = ({ message}) => {
  if(message === null) {
    return null
  }
  return ( 
    <div className="alert">
      {message}
    </div>
  )
}
const Filter = ({ onchange, input }) => {

  return (
    <div>
      Filter shown with <input value={input} onChange={onchange} />
    </div>
  )
}

const NameAndNumber = ({ addon, onchange, input }) => {

  return (
    <div>
      {addon}<input value={input} onChange={onchange} />
    </div>
  )
}
const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState('')
  const [theMessage, setTheMessage] = useState(null)
  const removeElement = (id) => {
    
    personService
    .remove(id)
    setPersons(persons.filter(person => person.id !== id))

  
    
  }
  const hook = () => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)

      })
  }

  useEffect(hook, [])

  const personsToShow = showAll
    ? persons.filter(element => element.name.toUpperCase().includes(showAll.toUpperCase()))
    : persons

  const addName = (event) => {
    event.preventDefault()
    const personsObject = {
      name: newName,
      number: newNumber,
      id: Math.random,
    }

    if ((persons.map(element => element.name).includes(newName)) === true) {
      return alert(`${newName} is a duplicate`)
    } else {
      personService
        .create(personsObject)
        .then(returnedPersons => {
          setPersons(persons.concat(returnedPersons))
          setTheMessage(
            `${newName} was added to the server`
          )
          setTimeout(() => {
            setTheMessage(null)
          }, 5000)
          setNewName('')
          setNewNumber('')
          console.log(personsObject)
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setShowAll(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter input={showAll} onchange={handleFilterChange} />

      <h2>add a new</h2>
      <Notification message ={theMessage}/>
      <form onSubmit={addName}>
        <div>
          <NameAndNumber addon="Name:" input={newName} onchange={handleNameChange} />
          <NameAndNumber addon="Number:" input={newNumber} onchange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
        <h2>Numbers</h2>
      </form>
      {personsToShow.map(person =>
        <Person 
         person={person}
         number={person.numbers}
         key={person.id}
         remove={()=>removeElement(person.id)} />
      )}

    </div>



  )
}

export default App