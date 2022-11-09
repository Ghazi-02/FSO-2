import { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({ country }) => {
  return (
    <li>
      {country.name}
    </li>
  )
}

const Filter = ({ onchange, input }) => {

  return (
    <div>
      Find countries<input value={input} onChange={onchange} />
    </div>
  )
}

function App() {

  const [countries, setCountries] = useState([])
  const [showAll, setShowAll] = useState('')


  useEffect(() => {
    axios
      .get('https://restcountries.com/v2/all')
      .then(response => {
        setCountries(response.data)

      })
  })



  let countriesToShow = showAll ? countries.filter(element => element.name.toUpperCase().includes(showAll.toUpperCase())) : countries


  const handleFilterChange = (event) => {
    setShowAll(event.target.value)
  }
  return (
    <div>
      <Filter input={showAll} onchange={handleFilterChange} />
      <div>

        {/* {countriesToShow.map(country =>
          <Country
            country={country}
            key={country.id}

          />
        )} */}

        {countriesToShow.length < 10
          ? countriesToShow.map(country =>
            <Country
              country={country}
              key={country.id}
            />)
          : <div>Be more specific</div>
        }



      </div>

    </div>
  );
}

export default App;
