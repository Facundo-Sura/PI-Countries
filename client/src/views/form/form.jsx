import styles from "./form.module.css";
import { useEffect, useState } from "react";
import { createActivity } from "../../redux/actions";
import { useDispatch } from "react-redux";
import axios from "axios";
import validate from "./validation";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/Footer";

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
    if (!input.name || !input.dificulty || !input.duration || !input.season || input.countries.length === 0) {
      console.error("Algunos campos están sin definir");
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
      countries: [],
    });
  };

  useEffect(() => {
    if (input.name || input.dificulty || input.duration || input.season || input.countries.length !== 0) {
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

  return (
    <div className={styles.container}>
      <Navbar />
      <video className={styles.video} autoPlay muted loop src="/background.mp4"></video>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>CREA TU ACTIVIDAD</h2>

        {showActivityCreated && (
          <div className={styles.activityCreated}>
            <p>¡Actividad creada exitosamente!</p>
            <ul>
              <li>Nombre: {createdActivityInfo.name}</li>
              <li>Dificultad: {createdActivityInfo.dificulty}</li>
              <li>Duración: {createdActivityInfo.duration} HS</li>
              <li>Temporada: {createdActivityInfo.season}</li>
              {createdActivityInfo.countries?.length > 0 && (
                <>
                  <p>Países:</p>
                  <ul>
                    {createdActivityInfo.countries.map((country, index) => (
                      <li key={index}>{country}</li>
                    ))}
                  </ul>
                </>
              )}
            </ul>
            <button className={styles.button} type="button" onClick={() => setShowActivityCreated(false)}>Cerrar</button>
          </div>
        )}

        <label className={styles.label}>Nombre de la actividad:</label>
        <input className={styles.input} name="name" value={input.name} onChange={handleChange} placeholder="Ingrese el nombre de la actividad" />
        {error.name && <span className={styles.error}>{error.name}</span>}

        <label className={styles.label}>Dificultad de la actividad:</label>
        <input className={styles.input} name="dificulty" value={input.dificulty} onChange={handleChange} placeholder="1 (fácil) - 5 (difícil)" />
        {error.dificulty && <span className={styles.error}>{error.dificulty}</span>}

        <label className={styles.label}>Duración:</label>
        <input className={styles.input} name="duration" value={input.duration} onChange={handleChange} placeholder="Duración en horas" />
        {error.duration && <span className={styles.error}>{error.duration}</span>}

        <label className={styles.label}>Temporada:</label>
        <select className={styles.select} name="season" value={input.season} onChange={handleChange}>
          <option value="">Seleccione temporada</option>
          <option value="Verano">Verano</option>
          <option value="Primavera">Primavera</option>
          <option value="Invierno">Invierno</option>
          <option value="Otoño">Otoño</option>
        </select>
        {error.season && <span className={styles.error}>{error.season}</span>}

        <label className={styles.label}>País:</label>
        <input className={styles.input} type="text" placeholder="Buscar país" value={searchTerm} onChange={handleSearchChange} />
        <select className={styles.select} name="country" multiple value={input.country} onChange={handleChange}>
          {filteredCountries.map((country) => (
            <option key={country.id} value={country.name}>{country.name}</option>
          ))}
        </select>
        {error.countries && <span className={styles.error}>{error.countries}</span>}

        <label className={styles.label}>Países seleccionados:</label>
        <div className={styles.selectedCountries}>
          {input.countries.length > 0 ? (
            input.countries.map((selectedCountry, index) => (
              <div className={styles.selectedCountryItem} key={index}>
                <button className={styles.removeButton} type="button" onClick={() => handleRemoveCountry(selectedCountry)}>X</button>
                {selectedCountry}
              </div>
            ))
          ) : (
            <p>No hay países seleccionados</p>
          )}
        </div>

        {Object.keys(error).length === 0 && (
          <button className={styles.button} type="submit">Crear actividad turística</button>
        )}
      </form>
      <Footer />
    </div>
  );
}

export default Form;
