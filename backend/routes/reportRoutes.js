const verifyToken =
require("../middleware/auth");
const express = require("express");

const router = express.Router();

const Volunteer = require("../models/Volunteer");

const { Parser } = require("json2csv");

const PDFDocument = require("pdfkit");


// CSV Report

router.get("/csv", verifyToken, async(req,res)=>{


try{


const volunteers =
await Volunteer.find();



const fields = [
"name",
"email",
"phone",
"city",
"skills",
"availability"
];



const parser =
new Parser({fields});



const csv =
parser.parse(volunteers);



res.header(
"Content-Type",
"text/csv"
);



res.attachment(
"volunteer_report.csv"
);



res.send(csv);



}

catch(error){

res.status(500).json({

error:error.message

});

}


});




// PDF Report

router.get("/pdf", verifyToken, async(req,res)=>{


const volunteers =
await Volunteer.find();



const doc =
new PDFDocument();



res.setHeader(
"Content-Type",
"application/pdf"
);


res.setHeader(
"Content-Disposition",
"attachment; filename=volunteer_report.pdf"
);



doc.pipe(res);



doc.fontSize(20)
.text(
"NayePankh Foundation Volunteer Report"
);



doc.moveDown();



doc.fontSize(12);



volunteers.forEach((v,index)=>{


doc.text(

`${index+1}. 
Name: ${v.name}
Email: ${v.email}
Phone: ${v.phone}
City: ${v.city}
Skills: ${v.skills.join(", ")}

`

);


});



doc.end();



});



module.exports = router;