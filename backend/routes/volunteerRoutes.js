const verifyToken =
require("../middleware/auth");

const verifyToken = require("../middleware/auth");

const express = require("express");

const router = express.Router();


const Volunteer = require("../models/Volunteer");



// Register Volunteer

router.post("/", async(req,res)=>{

try{


const volunteer = new Volunteer(req.body);


await volunteer.save();



res.json({

message:"Volunteer Registered Successfully"

});


}

catch(error){


res.status(500).json({

error:error.message

});


}


});




// Get All Volunteers

router.get("/", async(req,res)=>{


try{


const volunteers = await Volunteer.find();


res.json(volunteers);


}

catch(error){


res.status(500).json({

error:error.message

});


}


});




// Delete Volunteer

router.delete("/:id", verifyToken, async(req,res)=>{


try{


const deletedVolunteer =
await Volunteer.findByIdAndDelete(req.params.id);



if(!deletedVolunteer){

return res.status(404).json({

message:"Volunteer not found"

});

}



res.json({

message:"Volunteer deleted successfully"

});


}
catch(error){


res.status(500).json({

error:error.message

});


}


});




module.exports = router;