const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slugify = require("../middleware/slug-format");

const categorySchema = new Schema({
  name: { type: String, unique: true, required: true },
  date: { type:Date, default: Date.now },
  slug: { type: String, index: true },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
    ref: "Category",
    index: true,
  },
  ancestors: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
      name: String,
      slug: String,
    },
  ],
  childrens: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
      name: String,
      slug: String,
    },
  ]
});



categorySchema.pre("save", async function (next) {
  this.slug = slugify(this.name);
  next();
});

module.exports = mongoose.model("Category", categorySchema);

