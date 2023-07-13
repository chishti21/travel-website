const mongoose = require('mongoose');
const validator=require('validator');
const quriesSchema=new mongoose.Schema({
    email:String,
    message:String
})
const Quries=new mongoose.model("Quries",quriesSchema);
module.exports=Quries;