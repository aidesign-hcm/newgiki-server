const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  avatar: { type: String},
  userName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    _id: mongoose.Schema.Types.ObjectId,
    name: {type:String},
    street: {type: String},
    apartment: {type: String},
    district: {type: String},
    city: {type: String},
    phoneNumber: {type: Number},
  }
});

// userSchema.pre("save", function (next) {
//   let user = this;
//   console.log(user);
//   if (this.isModified("password") || this.isNew) {
//     bcrypt.genSalt(10, function(err, salt) {
//       if (err) {
//         return next(err);
//       }
//       bcrypt.hash(user.password, salt, null, function (err, hash) {
//         if (err) {
//           return next(err);
//         }
//         user.password = hash;
//         next();
//       });
//     });
//   } else {
//     return next();
//   }
// });

userSchema.methods.comparePassword = function(password, next) {
  let user = this;
  return bcrypt.compareSync(password, user.password)
}

module.exports = mongoose.model("User", userSchema);
