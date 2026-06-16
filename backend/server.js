const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();


const app = express();



app.use(cors());

app.use(express.json());



// Database Connection

mongoose.connect(process.env.MONGO_URL)
.then(()=>{

    console.log("MongoDB Connected");

})
.catch((err)=>{

    console.log(err);

});



// Routes

const volunteerRoutes =
require("./routes/volunteerRoutes");


app.use("/api/volunteers", volunteerRoutes);

const authRoutes =
require("./routes/authRoutes");


app.use("/api/auth",authRoutes);

const reportRoutes =
require("./routes/reportRoutes");


app.use("/api/reports", reportRoutes);

app.get("/",(req,res)=>{

    res.send("NayePankh Volunteer System Backend Running");

});

app.listen(5000,()=>{

console.log("Server running on port 5000");

});