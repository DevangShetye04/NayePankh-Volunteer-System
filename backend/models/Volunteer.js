const mongoose = require("mongoose");


const volunteerSchema = new mongoose.Schema({


name:{
type:String,
required:true
},


email:{
type:String,
required:true
},


phone:String,

age:Number,


gender:String,


city:String,


skills:[String],


availability:String,


reason:String,


date:{
type:Date,
default:Date.now
}



});


module.exports =
mongoose.model(
"Volunteer",
volunteerSchema
);