const mongoose = require("mongoose");
const Attribute = require("../models/attributes");

exports.create_attribute = async (req, res) => {
  try {
    const attribute = new Attribute({ name: req.body.name });
    await attribute.save();
    res.status(201).send({
      status: true,
      attribute,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

exports.create_attribute_term = async (req, res) => {
  try {
    const attribute = await Attribute.findById({_id: req.params.id})

    attribute.terms.push({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        color: req.body.color
    })
    await attribute.save();
    res.status(201).send({
      status: true,
      attribute,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

exports.get_all_attribute = async (req, res) => {
  try {
    var attributes = await Attribute.find().select().exec();
    res.status(201).json({ status: true, attributes });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

exports.get_attribute_term = async (req, res) => {
  try {
    const attribute = await Attribute.findById({_id: req.params.id})
    res.status(201).json({ status: true, attribute });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};