const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
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
