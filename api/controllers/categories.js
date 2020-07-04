const mongoose = require("mongoose");
const Category = require('../models/categories')

exports.create_category = async (req,res) => {
    try {
        let category = new Category({
            type : req.body.type
        });
        await category.save()
        res.status(200).json({
            status:true,
            message: 'Category create successfully'
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
          error: err,
          message: "can't create category"
        });
    }
}

exports.get_category = async (req,res) => {
    try {
        let categories = await Category.find()
        res.status(200).json({
            status:true,
            categories: categories
        })
    } catch (err) {
        console.log(err);
        res.status(404).json({
          error: err
        });
    }
}