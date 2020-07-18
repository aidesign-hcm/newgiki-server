const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slugify = require("../middleware/slug-format");


const attributeSchema = new Schema({
  name: { type: String, unique: true, required: true },
  date: { type: Date, default: Date.now },
  slug: { type: String, index: true },
  terms: [
    {
      _id: mongoose.Schema.Types.ObjectId,
      name: String,
      slug: String,
      color: String
    },
  ],
});

attributeSchema.pre("save", async function (next) {
  this.slug = slugify(this.name);
  next();
});

module.exports = mongoose.model("Attribute", attributeSchema);
