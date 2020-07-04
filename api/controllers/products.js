const mongoose = require("mongoose");
const Product = require("../models/products");
const User = require("../models/auth");
const Category = require("../models/categories");

// Get tat ca san pham
exports.products_get_all = async (req, res) => {
  try {
    var products = await Product.find()
      .populate("User Category")
      .select()
      .exec();
    res.status(200).json({
      message: "this is all products",
      count: products.length,
      products,
    });
  } catch (err) {
    res.status(500).json({
      message: "Can't get products",
      error: err,
    });
  }
};

// Get tat ca san pham theo user Id
exports.product_byUser = async (req, res) => {
  try {
    let foundUser = await User.findOne({ _id: req.decoded._id })
    let FoundProduct = await Product.find({User: foundUser._id})
    .populate("User")
    .exec();
    res.status(200).json({
      count: FoundProduct.length,
      FoundProduct,
    });
  } catch (err) {
    res.status(500).json({
      message: "Product not found",
    });
  }
};

// tao san pham moi
exports.products_create_product = async  (req, res) => {
  try{
    const product = new Product({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      price: req.body.price,
      productImage: req.file.path,
      desc: req.body.desc,
      User: req.body.User,
      Category: req.body.Category,
      StockQuantity: req.body.StockQuantity
    });
    await product.save()
    res.status(200).json({
      status: true,
      message: "Product create successfully",
      product: product,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
};

// lay san pham theo id
exports.products_get_product = async (req, res) => {
  try {
    const id = await req.params.id;
    const product = await Product.findById(id)
    .populate("User")
    .exec();
    res.status(200).json({
      success:true,
      product: product,
    });
  } catch (err) {
    res.status(500).json({
      message: "Product not found",
    });
  }
};

// update san pham use patch

exports.products_update_product = (req, res) => {
  const id = req.params.id;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Product.update({ _id: id }, { $set: updateOps })
    .exec()
    .then((product) => {
      res.status(200).json({
        message: "Product updated",
        product,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Some thing Error",
      });
    });
};

/// Chinh sua san pham dang put chinh sua tung noi dung

exports.update_product_by_put = async (req, res) => {
  try {
    const id = req.params.id;
    let product = await Product.findByIdAndUpdate(
      { _id: id },{ 
        $set: {
          name : req.body.name,
          desc : req.body.desc,
          productImage : req.file.path,
          price : req.body.price,
          StockQuantity : req.body.StockQuantity,
          category : req.body.category,
          User : req.body.User,
      }},
      { upsert: true }
    );
    res.status(200).json({
      updateProducts: product,
      success: true 
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      error: err,
    });
  }
};

// xoa san pham
exports.products_delete = (req, res) => {
  const id = req.params.id;
  Product.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        success:true,
        message: "Product has been delete",
        result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "No product to delete",
      });
    });
};
