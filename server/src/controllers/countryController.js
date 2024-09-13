const { Country } = require("../db");
const { Op } = require("sequelize");
const axios = require("axios");

const mapApi = (array) => {
  return array.map((country) => {
    return {
      id: country.cca3,
      name: country.name.common,
      flags: country.flags?.png,
      continents: country.continents[0],
      subregion: country.subregion || "",
      capital: Array.isArray(country.capital) ? country.capital[0] : "",
      area: country.area,
      population: country.population,
    };
  });
};

const getAllCountries = async () => {
  try {
    const response = await axios.get("http://localhost:5000/countries");
    const CountriesData = response.data;

    const mapCountries = mapApi(CountriesData);

    for (const country of mapCountries) {
      await Country.findOrCreate({
        where: { id: country.id },
        defaults: country,
      });
    }

    const allCountries = await Country.findAll();
    return allCountries;
  } catch (error) {
    console.error("error al cargar paises", error);
    return [];
  }
};

const getCountryById = async (id) => {
  try {
    console.log("este es le id:", id);
    const country = await Country.findByPk(id);
    console.log("este es el country", country);
    return country;
  } catch (error) {
    console.error("Error al obtener al pais por id", error);
    return null;
  }
};

const getCountryByName = async (name) => {
  try {
    console.log("este esel nombre:", name);

    const country = await Country.findAll({
      where: { name: { [Op.iLike]: `%${name}%` } },
    });
    return country;
  } catch (error) {
    console.error("Error al encontra al pais", error);
  }
};

module.exports = {
  getAllCountries,
  getCountryById,
  getCountryByName,
};
