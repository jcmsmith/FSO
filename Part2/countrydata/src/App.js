import { useState, useEffect } from 'react'
import axios from 'axios'

import Display from './Components/Display'


function App() {
  const [countryFilter, setCountryFilter] = useState('')
  const [data, setData] = useState([])

  const handleFilterChange = (event) => setCountryFilter(event.target.value)

  const handleResponse = (response) => {

    let data = response.data.filter((country) => {
      let name = country.name.common.toLowerCase()

      return name.includes(countryFilter.toLowerCase())
    })

    setData(data)
  }

  const getCountriesHook = () => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(handleResponse)
  }

  useEffect(getCountriesHook, [countryFilter])

  console.log('filter:', countryFilter)
  console.log('data:', data)

  return(
    <>
      <div>
        find countries:
        <input value={countryFilter} onChange={handleFilterChange} />
      </div>
      <Display data={data} />
    </>
  )
}

export default App;
