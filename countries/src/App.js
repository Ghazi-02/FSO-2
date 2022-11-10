import { useState, useEffect } from 'react'
import axios from 'axios'


const Country = ({ countries }) => {
 const [weather,setWeather]=useState([])
 
  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${countries.latlng[0]}&lon=${countries.latlng[1]}&appid=${api_key}`)
      .then(response => {
        console.log(response.data)
        setWeather(response.data)
      })
    })
  
  return (
    <div>
      <h2>{countries.name}</h2>
      <div>Capital {countries.capital}</div>
      <div>Area {countries.area}</div>
      <h4>Languages</h4>
      <div>{countries.languages.map(language => <li>{language.name}</li>)}</div>
      <img src={countries.flag} alt={'flag'} />
      <h4>Weather in {countries.name}</h4>
      <div> {weather}</div>
  
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
const Show = ({countries}) => {
  const [show,setShow]= useState(false)

  return(
    <div>     
    {show ? <Country countries ={countries}/> : <div></div>}
    <button onClick={() => setShow(!show)}>{show ? 'hide' : 'show'}</button>
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


  const countriesToShow = showAll ? countries.filter(element => element.name.toUpperCase().includes(showAll.toUpperCase())) : countries

  const handleFilterChange = (event) => {
    setShowAll(event.target.value)
  }
  return (
    <div>
      <Filter input={showAll} onchange={handleFilterChange} />
      <div>
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
          } else return countriesToShow.map(country => {
              return (
                <div>
                  {country.name}<Show countries ={country}/>

                </div>
              )
            })
        })()}
      </div>

    </div>
  );
}

export default App;
