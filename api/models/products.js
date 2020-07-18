const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAlgolia = require('mongoose-algolia')
const deepPopulate = require('mongoose-deep-populate')(mongoose);
const slugify = require("../middleware/slug-format");

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    User: {type: Schema.Types.ObjectId, ref: 'User'},
    Category: {type: Schema.Types.ObjectId, ref: 'Category', index: true},
    attribute: {type: Array},
    name: { type: String, required: true },
    price: { type: Number, required: true },
    productImage: { type: Array, required: true },
    desc: {type: String, required: true },
    StockQuantity: {type: Number},
    date: { type:Date, default: Date.now },
    slug: { type: String, index: true },
});

productSchema.pre("save", async function (next) {
  this.slug = slugify(this.name);
  next();
});

productSchema.plugin(deepPopulate);

productSchema.plugin(mongooseAlgolia, {
    appId: process.env.ALGOLIA_APP_ID,
    apiKey: process.env.ALGOLIA_SECRET,
    indexName: 'amazon_Clone', //The name of the index in Algolia, you can also pass in a function
    selector: "name _id Category price productImage", 
    populate: {
      path: 'User',
      select: 'name',
    },
    debug: true, // Default: false -> If true operations are logged out in your console
  })
   
  
let Model = mongoose.model('Product', productSchema)
   
  Model.SyncToAlgolia(); //Clears the Algolia index for this schema and synchronizes all documents to Algolia (based on the settings defined in your plugin settings)
  Model.SetAlgoliaSettings({
    searchableAttributes: ['name'], //Sets the settings for this schema, see [Algolia's Index settings parameters](https://www.algolia.com/doc/api-client/javascript/settings#set-settings) for more info.
  })
  

module.exports = Model