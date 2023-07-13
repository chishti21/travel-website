const mongoose = require('mongoose');
const validator=require('validator');
const DestinationSchema=new mongoose.Schema({
    name:String,
    days:String,
    nights:String,
    imageUrl:String,
    price:String

})
const Destination=new mongoose.model("Destination",DestinationSchema);
module.exports=Destination;