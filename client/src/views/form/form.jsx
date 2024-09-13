import { useEffect, useState } from "react";
import { createActivity } from "../../redux/actions";
import { useDispatch } from "react-redux";
import axios from "axios";
import validate from "./validation";
import Navbar from "../../components/navbar/navbar";
import "./form.css";

function Form() {
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    name: "",
    dificulty: "",
    duration: "",
    season: "",
    countries: [],
  });

  const [error, setError] = useState({});
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showActivityCreated, setShowActivityCreated] = useState(false);
  const [createdActivityInfo, setCreatedActivityInfo] = useState({});

  const getCountries = async () => {
    try {
      const response = await axios("http://localhost:3001/countries");
      const data = response.data;
      data.sort((a, b) => a.name.localeCompare(b.name));
      setCountries(data);
    } catch (error) {
      console.error("Error al obtener la lista de paises", error);
    }
  };

  useEffect(() => {
    getCountries();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "country") {
      const selectedOptions = Array.from(
        e.target.selectedOptions,
        (option) => option.value
      );
      const filteredSelectedOptions = selectedOptions.filter(
        (option) => option !== ""
      );

      const newCountries = filteredSelectedOptions.filter(
        (country) => !input.countries.includes(country)
      );
      setInput((prevInput) => ({
        ...prevInput,
        countries: [...prevInput.countries, ...newCountries],
      }));
    } else {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !input.name ||
      !input.dificulty ||
      !input.duration ||
      !input.season ||
      !input.countries.length === 0
    ) {
      console.error("Algunos campos estan sin definir");
      return;
    }
    dispatch(createActivity(input))
      .then((res) => {
        setCreatedActivityInfo(res);
        setShowActivityCreated(true);
      })
      .catch((err) => {
        console.error("Error al crear la actividad", err);
      });
    setInput({
      name: "",
      dificulty: "",
      duration: "",
      season: "",
      countries: "",
    });
  };

  useEffect(() => {
    if (
      input.name !== "" ||
      input.dificulty !== "" ||
      input.duration !== "" ||
      input.season !== "" ||
      input.countries != []
    ) {
      const countryValidate = validate(input);
      setError(countryValidate);
    }
  }, [input]);

  const handleRemoveCountry = (countryToRemove) => {
    setInput((prevInput) => ({
      ...prevInput,
      countries: prevInput.countries.filter(
        (country) => country !== countryToRemove
      ),
    }));
  };

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log(createdActivityInfo);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="formAllCountainer">
        <form onSubmit={handleSubmit} className="formContainer">
          <h2>CREA TU ACTIVIDAD</h2>
          {showActivityCreated && (
            <div className="activityCreated">
              <p>Actividad creada exitosamente!</p>
              <p>Información de la actividad:</p>
              <ul>
                <li>Nombre: {createdActivityInfo.name}</li>
                <li>Dificultad: {createdActivityInfo.dificulty}</li>
                <li>Duración: {createdActivityInfo.duration} HS</li>
                <li>Temporada: {createdActivityInfo.season}</li>
                {createdActivityInfo.countries.length > 0 && (
                  <ul>
                    <li>Paises:</li>
                    {createdActivityInfo.countries.map((country) => (
                      <li key={country}>{country}.</li>
                    ))}
                  </ul>
                )}
              </ul>
              <button onClick={() => setShowActivityCreated(false)}>
                Cerrar
              </button>
            </div>
          )}
          <div>
            <label> Nombre de la actividad:</label>
            <input
              name="name"
              value={input.name}
              onChange={handleChange}
              placeholder="Ingrese el nombre de la actividad"
            />
            <div>
              {error.name && <span className="error">{error.name}</span>}
            </div>
          </div>
          <div>
            <div>
              <label> Difucultad de la actividad:</label>
            </div>
            <input
              name="dificulty"
              value={input.dificulty}
              onChange={handleChange}
              placeholder="Seleccion de dificultad(Donde 1 es facil y 5 dificil)"
            />
            <div>
              {error.dificulty && (
                <span className="error">{error.dificulty}</span>
              )}
            </div>
          </div>
          <div>
            <label> Duracion:</label>
            <div>
              <input
                name="duration"
                value={input.duration}
                onChange={handleChange}
                placeholder="Seleccion de Duracion en Horas"
              />
            </div>
            <div>
              {error.duration && (
                <span className="error">{error.duration}</span>
              )}
            </div>
          </div>
          <div>
            <div>
              <label> Temporada:</label>
            </div>
            <select name="season" value={input.season} onChange={handleChange}>
              <option value="">Seleccione de temporada</option>
              <option value="Verano">Verano</option>
              <option value="Primavera">Primavera</option>
              <option value="Invierno">Invierno</option>
              <option value="Otoño">Otoño</option>
            </select>
          </div>
          <div>
            {error.season && <span className="error">{error.season}</span>}
          </div>
          <div className="pais">
            <label> Pais:</label>
            <div>
              {error.countries && (
                <span className="error">{error.countries}</span>
              )}
            </div>
            <input
              type="text"
              placeholder="Buscar país"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <select
              name="country"
              multiple
              value={input.country}
              onChange={handleChange}
            >
              {filteredCountries.map((country) => (
                <option key={country.id} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
          <div className="paisSelect">
            <label> Países seleccionados: </label>
            <ul>
              {input.countries.length > 0 ? (
                input.countries.map((selectedCountry, index) => (
                  <li key={index}>
                    {selectedCountry}
                    <button type="button"
                      onClick={() => handleRemoveCountry(selectedCountry)}
                    >
                      x
                    </button>
                  </li>
                ))
              ) : (
                <li></li>
              )}
            </ul>
          </div>
          {Object.keys(error).length === 0 && (
            <button type="submit" >
              Crear actividad turística
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default Form;
