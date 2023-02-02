const mongoose = require("mongoose");
const app = require("./app");
require("dotenv").config();

mongoose.set('strictQuery', false);
mongoose.connect(process.env.DATABASE_URL,(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("Connected to Db");
    }
})

app.listen(process.env.PORT,()=>{
    console.log("connected to " + process.env.PORT);
})