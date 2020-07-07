const mongoose = require("mongoose");
const User = require("../models/users");
const axios = require("axios");
const Address = require("../models/address");

exports.create_address = async (req, res) => {
  try {
    let address = new Address({
      user: req.decoded._id,
      street: req.body.street,
      apartment: req.body.apartment,
      district: req.body.district,
      city: req.body.city,
      phoneNumber: req.body.phoneNumber,
    });

    await address.save();
    res.status(200).json({
      success: true,
      message: "address create successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      error: err,
    });
  }
};

exports.get_user_address = async (req, res) => {
  try {
    let address = await Address.find({ user: req.decoded._id });
    res.status(200).json({
      success: true,
      address: address,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      error: err,
    });
  }
};

exports.get_city_address = async (req, res) => {
  try {
    let response = await axios.get(
      "https://raw.githubusercontent.com/daohoangson/dvhcvn/master/data/dvhcvn.json"
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

exports.edit_address = async (req, res) => {
  try {
    let foundAdd = await Address.findOne({
      _id: req.params.id,
      user: req.decoded._id,
    });
    if (foundAdd) {
      if (req.body.street)
        foundAdd.street = req.body.street;
      if (req.body.apartment) foundAdd.apartment = req.body.apartment;
      if (req.body.district) foundAdd.district = req.body.district;
      if (req.body.city) foundAdd.city = req.body.city;
      if (req.body.phoneNumber) foundAdd.phoneNumber = req.body.phoneNumber;
    }
    await foundAdd.save();
    res.status(200).json({
      success: true,
      message: "Successfully updated the address",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.delete_address = async (req, res) => {
  try {
    let deleteAddress = await Address.remove({
      user: req.decoded._id,
      _id: req.params.id,
    });
    if (deleteAddress) {
      res.status(200).json({
        success: true,
        message: "Address has been delete",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.get_address_by_id = async (req, res) => {
    try {
      let foundAddress = await Address.findOne({ _id: req.params.id });
      res.status(200).json({
        success: true,
        address: foundAddress,
      });
    } catch (err) {
      res.status(500).json({
        message: err.message,
        success: false,
      });
    }
  }

  exports.setDefaultAddress = async (req, res) => {
    try {
      const updatedAddressUser = await User.findOneAndUpdate(
        {_id: req.decoded._id},
        {$set: {address: req.body.id}})
      if(updatedAddressUser){
        res.status(200).json({
          success: true,
          message: "Address has been set default"
        })
      }
    } catch(err){
      console.log(err)
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }