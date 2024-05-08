const {
  getAllActivities,
  createActivity,
} = require("../controllers/activityController");

const createActivities = async (req, res) => {
  const { name, dificulty, duration, season, countries } = req.body;
  try {
    const response = await createActivity({
      name,
      dificulty,
      duration,
      season,
      countries
    });
    res.status(200).json(response);
  } catch (error) {
    console.error("No se pudo crear la actividad", error);
    res.status(400).json({ error: "no se pudo crear la actividad" });
  }
};

const getActivities = async (req, res) => {
  try {
    const activities = await getAllActivities();
    res.status(200).json(activities);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
    createActivities,
  getActivities,
};
