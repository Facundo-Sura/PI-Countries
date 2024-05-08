const {Activity} = require("../db");

const createActivity = async ({name, dificulty, duration, season, countries}) => {

  console.log("este es el input: ", name, dificulty, duration, season, countries)
    try {
  const createdCountry= await  Activity.create({
    name, dificulty, duration, season, countries 
  });

  return createdCountry;
} catch (error) {
    console.error("Error creando actividad en la base de datos:", error);
    throw new Error(
      `No se pudo crear la actividad en la base de datos: ${error.message}`
    );
}
}

const getAllActivities = async () => {
  try {
    const allActivities = await Activity.findAll();
    return allActivities;
  } catch (error) {
    console.error("error al cargar actividades", error);
  }
};

module.exports = {
    createActivity,
  getAllActivities,
};
