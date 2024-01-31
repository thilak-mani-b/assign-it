const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    googleId:String,
    displayName:String,
    email:String,
    image:String
},{timeStamps:true});

const userDB = new mongoose.model("users",userSchema);

module.exports = userDB;