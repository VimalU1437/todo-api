const mongoose = require("mongoose");

const RegisterSchema = mongoose.Schema({
    user:{type:String,required:true,unique:true},
    password:{type:String,required:true}
})

const RegisterModel = mongoose.model("users",RegisterSchema);

module.exports = RegisterModel;