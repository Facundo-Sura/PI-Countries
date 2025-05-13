const { Router } = require("express");

const router = Router();

const {
  getCountries,
  getDetailCountries,
} = require("../handlers/countryHandler");
const {
  getActivities,
  createActivities,
} = require("../handlers/activityHandler");
const contactHandler = require("../handlers/contactHandler");

router.get("/countries", getCountries);
router.get("/countries/:id", getDetailCountries);
router.get("/activities", getActivities);
router.post("/activities", createActivities);
router.post(" /contact", contactHandler);

module.exports = router;
