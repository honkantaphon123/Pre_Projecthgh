const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    fullname: { type: String},
    username: { type: String,unique: true },
    telephone: { type: String},
    email: { type: String,unique: true },
    password: { type: String},
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", UserSchema);
