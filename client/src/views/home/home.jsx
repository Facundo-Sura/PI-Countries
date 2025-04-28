import styles from "./home.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCountries,
  getCountryByName,
  allActivities,
} from "../../redux/actions";
import Cards from "../../components/cards/cards";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/Footer";

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
  const [firstState, setState] = useState(false);

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

  useEffect(() => {
    if (allCountries.length !== 0) {
      setState(true);
    }
  }, [allCountries]);
  // FILTRADOS

  useEffect(() => {
    let filteredCont = allCountries.slice();

    if (searchString.trim() !== "") {
      filteredCont = filteredCont.filter((country) =>
        country.name.toLowerCase().includes(searchString.toLowerCase())
      );
      if (filteredCont.length === 0) {
        alert("No existe el pais buscado");
        filteredCont = allCountries;
      }
    }
    console.log(allCountries.length);

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
    <div className={styles.container}>
      <Navbar handleChange={handleChange} handleSubmit={handleSubmit} />
      <div className={styles.content}>
        <div className={styles.filters}>
          <h3>Filtros</h3>
          <select className={styles.select} value={selectContinent} onChange={handleContinentChange}>
            <option value="">Todos los continentes</option>
            <option value="Africa">Africa</option>
            <option value="South America">America del Sur</option>
            <option value="North America">America del Norte</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europa</option>
            <option value="Oceania">Oceanía</option>
          </select>

          <select className={styles.select} value={selectedActivity} onChange={handleActivitiesChange}>
            <option value="">Todas las actividades</option>
            {activities.map((activity) => (
              <option key={activity.id} value={activity.name}>
                {activity.name}
              </option>
            ))}
          </select>

          <select className={styles.select} value={selectOrden} onChange={handleOrderChange}>
            <option value="">Orden Alfabetico</option>
            <option value="asc">Ascendente</option>
            <option value="des">Descendente</option>
          </select>

          <select className={styles.select} value={selectPoblacion} onChange={handleOrdenPoblacionChange}>
            <option value="">Orden por población</option>
            <option value="asc">Ascendente</option>
            <option value="des">Descendente</option>
          </select>

          {desFilters && (
            <button className={styles.btnfilter} onClick={resetFilters}>Deshacer filtros</button>
          )}
        </div>

        <div className={styles.main}>
          <Cards allCountries={filtered.slice(currentPage, currentPage + 10)} />
          <div className={styles.buttons}>
            <button className={styles.button} onClick={prevPage} disabled={currentPage === 0}>
              Anterior
            </button>
            <button className={styles.button}
              onClick={nextPage}
              disabled={currentPage + 10 >= filtered.length}>
              Siguiente
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
