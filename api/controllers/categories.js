const mongoose = require("mongoose");
const Category = require("../models/categories");
const buildAncestors = require("../middleware/build-ancestors");
const buildChildrens = require("../middleware/build-children");

exports.create_category = async (req, res) => {
  let parent = req.body.parent ? req.body.parent : null;
  const category = new Category({ name: req.body.name, parent });
  try {
    let newCategory = await category.save();
    buildAncestors(newCategory._id, parent);
    buildChildrens(parent, newCategory._id);
    res.status(201).send({
      status: true,
      newCategory,
    });
  } catch (err) {
    console.log(err)
    res.status(500).send(err);
  }
};

exports.get_all_parent_categories = async (req, res) => {
  try {
    var categories = await Category.find()
    .select("name ancestors")
    .exec();
    res.status(201).json({ status: true, categories});
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

exports.get_parent_categories = async (req, res) => {
  try {
    var categories = await Category.find({ slug: req.query.slug })
      .select({
        _id: false,
        name: true,
        "ancestors.slug": true,
        "ancestors.name": true,
      })
      .exec();
    res.status(201).json({ status: true, categories });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

exports.get_descendants = async (req, res) => {
  try {
    const result = await Category.find({
      "ancestors._id": req.query.category_id,
    })
      .select({ _id: false, name: true })
      .exec();
    res.status(201).send({ status: "success", result });
  } catch (err) {
    console.log(err)
    res.status(500).send(err);
  }
};
