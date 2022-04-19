import axios from 'axios'
import { nanoid } from 'nanoid'

const Display = ({data, handleClick}) => {
  if (data.length > 10) {
    return (
      <div>
        <p>Too many matches, please specify another filter</p>
      </div>
    )
  }

  if (data.length == 0) return <p>No matches found!</p>

  if (data.length === 1) {
  
    let languages = Object.values(data[0].languages)    

    return (
      <div>
        <h1>{data[0].name.common}</h1>
        <p>capital: {data[0].capital[0]}</p>
        <p>area: {data[0].area}</p>
        <h2>languages:</h2>
        <ul>
          {languages.map((language) => <li key={nanoid()}>{language}</li> )}
        </ul>
        <img src={data[0].flags.png} />
      </div>
    )}

  /*if 2-10 or 0 countries returned from filter */
  const mapCountries = (country) => {
    return(
      <div key={nanoid()}>
        <li>{country.name.common}</li>
        <button onClick={() => handleClick(country.name.common)}>show details</button>
      </div>
    )
  }
  
  const names = data.map(mapCountries)

  return (
    <div>
      <ul>
        {names}
      </ul>
    </div>
  )
}

export default Display;
