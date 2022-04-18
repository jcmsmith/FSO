import { nanoid } from 'nanoid'

const Display = ({data}) => {
    if (data.length > 10) {
      return (
        <div>
          <p>Too many matches! Specify another filter</p>
        </div>
      )
    }
  
    const items = data.map((country) => <li key={nanoid()}>{country.name.common}</li> )
  
    return (
      <div>
        <ul>
          {items}
        </ul>
      </div>
    )
  }

  export default Display;
