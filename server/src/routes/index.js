const { Router } = require("express");
const {
  getCountries,
  getDetailCountries,
} = require("../handlers/countryHandler");
const {
  getActivities,
  createActivities,
} = require("../handlers/activityHandler");

const router = Router();

router.get("/countries", getCountries);
router.get("/countries/:id", getDetailCountries);
router.post("/activities", createActivities);
router.get("/activities", getActivities);

module.exports = router;
