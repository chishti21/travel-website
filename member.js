const mongoose = require('mongoose');
const validator=require('validator');
const memberSchema=new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String
    },
    password:{
        type:Number,
    },
    phone:{
        type:Number,
    },
    adress:{
        type:String,
    }
});
const Member1=new mongoose.model("Member1",memberSchema);
module.exports=Member1;