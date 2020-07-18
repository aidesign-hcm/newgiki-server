const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const categoryController = require("../controllers/categories");
const Category = require("../models/categories");

router.post("/", checkAuth, categoryController.create_category);

router.get("/", categoryController.get_all_parent_categories);

router.get("/ancestors/", categoryController.get_parent_categories);

router.get("/descendants/", categoryController.get_descendants);


module.exports = router;
