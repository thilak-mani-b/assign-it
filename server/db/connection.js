const mongoose = require("mongoose");

const DB = process.env.DATABASE_URL;
mongoose.connect(DB).then(()=>console.log("db connected")).catch(err=>console.log("err",err))
