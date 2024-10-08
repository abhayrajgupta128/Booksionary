"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var UserSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true
  },
  password: String
});
var UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;