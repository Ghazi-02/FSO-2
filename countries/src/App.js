import { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({ countries }) => {

  return (
    <div>
      <h1>{countries.name}</h1>
      <div>Capital {countries.capital}</div>
      <div>Area {countries.area}</div>
      <h4>Languages</h4>
      <div>{countries.languages.map(language => <li>{language.name}</li>)}</div>
      <img src={countries.flag} alt={'flag'} />

    </div>
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

        {/* {countriesToShow.length < 10
          ? countriesToShow.map(country =>
            <Country
              country={country}
              key={country.id}
            />)
          : <div>Be more specific</div>
        } */}
        {(() => {
          if (countriesToShow.length > 10) {
            return (<div>Too many countries to list! Specify another filter.</div>

            )
          } else if (countriesToShow.length === 1) {
            return (
              countriesToShow.map(country =>
                <Country
                  countries={country}

                />))
          } else return (
            countriesToShow.map(country =>
              <div>{country.name}</div>
            )
          )

        })()}



      </div>

    </div>
  );
}

export default App;
