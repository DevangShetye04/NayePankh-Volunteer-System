const express = require("express");

const router = express.Router();

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const Admin = require("../models/Admin");



// Register Admin (only once)

router.post("/register",async(req,res)=>{


const hashedPassword =
await bcrypt.hash(req.body.password,10);



const admin = new Admin({

email:req.body.email,

password:hashedPassword

});


await admin.save();


res.json({

message:"Admin Created"

});


});




// Login

router.post("/login",async(req,res)=>{


const admin =
await Admin.findOne({
email:req.body.email
});


if(!admin){

return res.status(400).json({

message:"Admin not found"

});

}



const validPassword =
await bcrypt.compare(
req.body.password,
admin.password
);



if(!validPassword){

return res.status(400).json({

message:"Wrong Password"

});

}



const token =
jwt.sign(
{
id:admin._id
},
"secretkey"
);



res.json({

token:token

});



});



module.exports=router;