import Card from "../card/card";

function Cards({ allCountries }) {
  return (
    <div className="row row-cols-1 row-cols-md-5 g-5 px-5 py-4">
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
