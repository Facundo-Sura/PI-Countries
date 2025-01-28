import { useEffect, useState } from "react";
import { createActivity } from "../../redux/actions";
import { useDispatch } from "react-redux";
import axios from "axios";
import validate from "./validation";
import Navbar from "../../components/navbar/navbar";

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
    <div id="form">
      <Navbar />
      <div className="w-100">
        <video
          id="form-vid"
          className="w-100 position-absolute z-0 overflow-y-hidden"
          autoPlay
          muted
          loop
          src="/background.mp4"
        ></video>
        <form onSubmit={handleSubmit} className="w-50 z-1 mt-3 p-5 bg-white position-absolute top-0 end-0 overflow-y-scroll">
          <h2>CREA TU ACTIVIDAD</h2>
          {showActivityCreated && (
            <div className="activityCreated">
              <p>Actividad creada exitosamente!</p>
              <p>Información de la actividad:</p>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  Nombre: {createdActivityInfo.name}
                </li>
                <li className="list-group-item">
                  Dificultad: {createdActivityInfo.dificulty}
                </li>
                <li className="list-group-item">
                  Duración: {createdActivityInfo.duration} HS
                </li>
                <li className="list-group-item">
                  Temporada: {createdActivityInfo.season}
                </li>
                {createdActivityInfo.countries.length > 0 && (
                  <ul className="list-group">
                    <li className="list-group-item list-group-item-action active">
                      Paises:
                    </li>
                    {createdActivityInfo.countries.map((country) => (
                      <li
                        className="list-group-item list-group-item-action"
                        key={country}
                      >
                        {country}.
                      </li>
                    ))}
                  </ul>
                )}
              </ul>
              <div className="d-grid gap-2">
                <button
                  className="btn btn-outline-primary"
                  onClick={() => setShowActivityCreated(false)}
                >
                  Cerrar
                </button>
              </div>
            </div>
          )}
          <div className="mb-3">
            <label className="form-label"> Nombre de la actividad:</label>
            <input
              className="form-control"
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
              <label className="form-label"> Difucultad de la actividad:</label>
            </div>
            <input
              className="form-control"
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
            <label className="form-label"> Duracion:</label>
            <div>
              <input
                className="form-control"
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
              <label className="form-label"> Temporada:</label>
            </div>
            <select
              className="form-select"
              name="season"
              value={input.season}
              onChange={handleChange}
            >
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
          <div className="mb-3">
            <label className="form-label"> Pais:</label>
            <div>
              {error.countries && (
                <span className="error">{error.countries}</span>
              )}
            </div>
            <input
              className="form-control"
              type="text"
              placeholder="Buscar país"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <select
              className="form-select"
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
          <div className="mb-3">
            <label className="form-label"> Países seleccionados: </label>
            <ul className="list-group">
              {input.countries.length > 0 ? (
                input.countries.map((selectedCountry, index) => (
                  <li className="list-group-item" key={index}>
                    <button
                      className="btn btn-outline-primary m-2 py-0"
                      type="button"
                      onClick={() => handleRemoveCountry(selectedCountry)}
                    >
                      X
                    </button>
                    {selectedCountry}
                  </li>
                ))
              ) : (
                <li></li>
              )}
            </ul>
          </div>
          <div className="d-grid gap-2">
            {Object.keys(error).length === 0 && (
              <button className="btn btn-outline-primary" type="submit">
                Crear actividad turística
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;
