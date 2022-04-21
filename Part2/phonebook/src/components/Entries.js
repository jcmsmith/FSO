import Person from './Person'

const Entries = ({entriesToShow}) => {
    return(
      <div>
        <ul>
          {entriesToShow.map((person) => 
            <Person key={person.id} name={person.name} number={person.number} />
          )}
        </ul>
      </div>
    )
  }

  export default Entries;