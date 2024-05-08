import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCountries,
  getCountryByName,
  allActivities,
} from "../../redux/actions";
import Cards from "../../components/cards/cards";
import Navbar from "../../components/navbar/navbar";
import "./home.css";

function Home() {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.allCountries);
  const [filtered, setFiltered] = useState(allCountries);
  const [searchString, setSearchString] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const activities = useSelector((state) => state.activities);
  const [selectedActivity, setSelectedActivity] = useState("");
  const [selectContinent, setSelectContinent] = useState("");
  const [selectOrden, setSelectOrden] = useState("");
  const [selectPoblacion, setSelectPoblacion] = useState("");
  const [desFilters, setDesFilters] = useState(false);

  //TRAER A LOS PAISES
  function handleChange(e) {
    setSearchString(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getCountryByName(searchString));
  }

  useEffect(() => {
    dispatch(getCountries());
    dispatch(allActivities());
  }, [dispatch]);

  // FILTRADOS

  useEffect(() => {
    let filteredCont = allCountries.slice();

    if (searchString.trim() !== "") {
      filteredCont = filteredCont.filter((country) =>
        country.name.toLowerCase().includes(searchString.toLowerCase())
      );
    }

    if (selectedActivity !== "") {
      const filteredActivity = activities.find(
        (activity) => activity.name === selectedActivity
      );

      if (filteredActivity) {
        filteredCont = filteredCont.filter((country) =>
          filteredActivity.countries.includes(country.name)
        );
      }
    }

    if (selectContinent !== "") {
      filteredCont = filteredCont.filter((country) =>
        country.continents.includes(selectContinent)
      );
    }

    if (selectOrden !== "") {
      filteredCont.sort((a, b) => {
        if (selectOrden === "asc") {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      });
    }

    if (selectPoblacion !== "") {
      filteredCont.sort((a, b) => {
        if (selectPoblacion === "asc") {
          return a.population - b.population;
        } else {
          return b.population - a.population;
        }
      });
    }

    setFiltered(filteredCont);
    setCurrentPage(0);
  }, [
    selectedActivity,
    activities,
    allCountries,
    selectContinent,
    selectOrden,
    selectPoblacion,
    searchString,
  ]);

  //PAGINADO
  const nextPage = () => {
    if (currentPage + 10 < filtered.length) setCurrentPage(currentPage + 10);
  };

  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 10);
  };

  const handleOrdenPoblacionChange = (e) => {
    setSelectPoblacion(e.target.value);
  };

  const handleOrderChange = (e) => {
    setSelectOrden(e.target.value);
  };

  const handleContinentChange = (e) => {
    setSelectContinent(e.target.value);
  };

  const handleActivitiesChange = (e) => {
    setSelectedActivity(e.target.value);
  };

  const resetFilters = () => {
    setSearchString("");
    setSelectedActivity("");
    setSelectContinent("");
    setSelectOrden("");
    setSelectPoblacion("");
  };

  useEffect(() => {
    let filtersApplied =
      searchString.trim() !== "" ||
      selectedActivity !== "" ||
      selectContinent !== "" ||
      selectOrden !== "" ||
      selectPoblacion !== "";
    setDesFilters(filtersApplied);
  }, [
    searchString,
    selectedActivity,
    selectContinent,
    selectOrden,
    selectPoblacion,
  ]);

  return (
    <div className="home-cont">
      <div>
        <Navbar handleChange={handleChange} handleSubmit={handleSubmit} />
      </div>

      <div className="card-conteiner">
        <div className="home-select">
          <div className="select-conteiner">
            <select value={selectContinent} onChange={handleContinentChange}>
              <option value="">Todos los continentes</option>
              <option value="Africa">Africa</option>
              <option value="South America">America del Sur</option>
              <option value="North America">America del Norte</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europa</option>
              <option value="Oceania">Oceanía</option>
            </select>
          </div>
          <div className="select-conteiner">
            <select value={selectedActivity} onChange={handleActivitiesChange}>
              <option value="">Todas las actividades</option>
              {activities.map((activity) => (
                <option key={activity.id} value={activity.name}>
                  {activity.name}
                </option>
              ))}
            </select>
          </div>
          <div className="select-conteiner">
            <select value={selectOrden} onChange={handleOrderChange}>
              <option value="">Orden Alfabetico</option>
              <option value="asc">Ascendente</option>
              <option value="des">Descendente</option>
            </select>
          </div>
          <div className="select-conteiner">
            <select
              value={selectPoblacion}
              onChange={handleOrdenPoblacionChange}
            >
              <option value="">Orden por poblacion</option>
              <option value="asc">Ascendente</option>
              <option value="des">Descendente</option>
            </select>
          </div>
        {desFilters && (
          <div className="boton-desacer">
            <button onClick={resetFilters}>Deshacer filtros</button>
          </div>
        )}

        </div>
        <Cards allCountries={filtered.slice(currentPage, currentPage + 10)} />
      </div>
      <div className="boton-paginacion">
        <button onClick={prevPage}>Anterior</button>
        <button onClick={nextPage}>Siguiente</button>
      </div>
    </div>
  );
}

export default Home;
