const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: Number, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

// UserSchema.pre("save", function (next) {
//   var user = this;

//   if (!user.isModified("password")) return next();
//   bcrypt.hash(user.password, null, null, function (err, hash) {
//     if (err) return next(err); // Exit if error is found
//     user.password = hash; // Assign the hash to the user's password so it is saved in database encrypted
//     next(); // Exit Bcrypt function
//   });
// });

// UserSchema.methods.comparePassword = function (password) {
//   return bcrypt.compareSync(password, this.password);
// };

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    // this.confompassword = await bcrypt.hash(this.confrompassword, 12);
    // if eny data ecrypt use this method
  }
  next();
});

module.exports = mongoose.model("List", UserSchema);
