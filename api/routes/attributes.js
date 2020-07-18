const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const attributeController = require("../controllers/attributes");

router.post("/", checkAuth, attributeController.create_attribute);

router.get("/", attributeController.get_all_attribute);

router.post("/:id", checkAuth, attributeController.create_attribute_term)

router.get("/:id", attributeController.get_attribute_term)

module.exports = router;
