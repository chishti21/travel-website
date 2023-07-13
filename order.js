const mongoose = require('mongoose');
const validator=require('validator');
const orderSchema=new mongoose.Schema({
    place:String,
    price:Number,
    name:String,
    phone:String,
    adress:String,
    cnic:String,
    seats:Number
})
const Order=new mongoose.model("Order",orderSchema);
module.exports=Order;