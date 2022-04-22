import Person from './Person'

const Entries = ({entriesToShow, deleteEntryHandler}) => {
    return(
      <div>
        <ul>
          {entriesToShow.map((person) => {
            return(
              <div key={person.id}>
                <Person name={person.name} number={person.number} />
                <button onClick={() => deleteEntryHandler(person.id)}>delete entry</button>
              </div>
            )
          })}
        </ul>
      </div>
    )
  }

  export default Entries;