const Category = require("../models/categories");
const buildChildrens = async (id, children_id) => {
  let ancest = [];
  try {
    let children_category = await Category.findOne({ _id: children_id }).exec();
    if (children_category) {
      const { _id, name, slug } = children_category;
      const ancest = children_category.childrens;
      ancest.unshift({ _id, name, slug });
      const category = await Category.findById(id, function (err, doc) {
        if (doc) {
          doc.childrens.push.apply(doc.childrens, ancest);
          doc.save();
        }
        if (err) {
          console.log(err);
        }
      });
    }
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = buildChildrens;
