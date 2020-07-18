const mongoose = require("mongoose");
const User = require("../models/users");
const axios = require("axios");
const Address = require("../models/address");

// Tao dia chi
exports.create_address = async (req, res) => {
  try {
    const updatedAddressUser = await User.findOneAndUpdate(
      { _id: req.decoded._id },
      { $set: { address: {
      user: req.decoded._id,
      name: req.body.name,
      street: req.body.street,
      apartment: req.body.apartment,
      district: req.body.district,
      city: req.body.city,
      phoneNumber: req.body.phoneNumber,
      } }
     },
     { upsert: true },
    );
    updatedAddressUser.save()
    res.status(200).json({
      updatedAddressUser: updatedAddressUser.address,
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

// Lay dia chi User
exports.get_user_address = async (req, res) => {
  try {
    let userInfo = await User.findOne({ _id: req.decoded._id })
    .populate()
    .select('address _id')
    .exec()
    res.status(200).json({
      success: true,
      userInfo,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      error: err,
    });
  }
};

// Lay Thanh pho tinh thanh
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

// Chinh sua dia chi
exports.edit_address = async (req, res) => {
  try {
    let foundAdd = await User.findOne({
      _id: req.decoded._id
    });
    if (foundAdd) {
      if (req.body.name) foundAdd.address.name = req.body.name;
      if (req.body.street) foundAdd.address.street = req.body.street;
      if (req.body.apartment) foundAdd.address.apartment = req.body.apartment;
      if (req.body.district) foundAdd.address.district = req.body.district;
      if (req.body.city) foundAdd.address.city = req.body.city;
      if (req.body.phoneNumber) foundAdd.address.phoneNumber = req.body.phoneNumber;
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


// exports.delete_address = async (req, res) => {
//   try {
//     let deleteAddress = await Address.remove({
//       user: req.decoded._id,
//       _id: req.params.id,
//     });
//     if (deleteAddress) {
//       res.status(200).json({
//         success: true,
//         message: "Address has been delete",
//       });
//     }
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };

// exports.get_address_by_id = async (req, res) => {
//     try {
//       let foundAddress = await Address.findOne({ _id: req.params.id });
//       res.status(200).json({
//         success: true,
//         address: foundAddress,
//       });
//     } catch (err) {
//       res.status(500).json({
//         message: err.message,
//         success: false,
//       });
//     }
//   }

// exports.setDefaultAddress = async (req, res) => {
//   try {
//     const updatedAddressUser = await User.findOneAndUpdate(
//       { _id: req.decoded._id },
//       { $set: { address: req.body.id } }
//     );
//     if (updatedAddressUser) {
//       res.status(200).json({
//         success: true,
//         message: "Address has been set default",
//       });
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };
