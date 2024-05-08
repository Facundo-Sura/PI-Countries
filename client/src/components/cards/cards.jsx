import Card from "../card/card";
import "./cards.css";

function Cards({allCountries}) {

  return (
  <div className='cards-cont'>
     {allCountries.map((country) => (
        <Card 
          key={country.id}
          id={country.id} 
          flags={country.flags} 
          name={country.name} 
          continents={country.continents}
      
          />
      ))}
  </div>
  );
}

export default Cards;