const {
  getCountryByName,
  getAllCountries,
  getCountryById,
} = require("../controllers/countryController");

const getDetailCountries = async (req, res) => {
  const { id } = req.params;
  console.log("este es el params", id);

  try {
    const response = await getCountryById(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getCountries = async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      const CountryByName = await getCountryByName(name);
      res.status(200).json(CountryByName);
    } else {
      getAllCountries();
      const countries = await getAllCountries();
      res.status(200).json(countries);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getCountries,
  getDetailCountries,
};
