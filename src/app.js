const express = require("express");
const formidable = require("express-formidable");
const app = express();
const RegisterModel = require("./model/register");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const auth =require("./auth/auth");
const cors = require("cors");


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(formidable());

app.post("/login",async (req,res)=>{
    try{
        
        let body = req.body.user ? req.body: req.fields;
        const data = await RegisterModel.findOne({user:body.user});
        // console.log(req.body);

        if(!data){
            return res.status(400).json({
                status: "failed",
                message:"user not exist"
            })
        }else{
            let pass = await bcrypt.compare(body.password,data.password);
            if(pass){
                const token  =  jwt.sign({
                    user : body.user
                },process.env.KEY,{expiresIn : "1h"});
                return res.json({
                    status : "Success",
                    token  : token,
                })
            }else{
                return res.status(400).json({
                    status:"failed",
                    message:"invalid password"
                })
            }
        }




    }
    catch(e){
        res.status(400).json({
            status:"failed",
            message:e.message
        })
    }

});

app.get("/todo",auth,async(req,res)=>{
    try{
        let body = req.body.user ? req.body: req.fields;
        const data = await RegisterModel.findOne({user:req.user});
        res.json({
            status:"Success",
            data: {
                user: data.user,
            }
        })
        


    }
    catch(e){

    }
})

app.post("/register",async(req,res)=>{
    try{
        let body = req.body.user ? req.body: req.fields;
        // console.log(req.fields);
        const salt  = await bcrypt.genSalt(13);
        const password = await bcrypt.hash(body.password,salt); 
        const data = await RegisterModel.create({
            user:body.user,
            password:password,
        })
        res.json({
            status:"Success",
            data:"user added successfully",
        })

        
    }
    catch(e){
       
        if(e?.keyValue){
            if(e.keyValue.user){
               return res.status(400).json({
                    status:"failed",
                    message:"user already exist",
                })
            } 
        }
        res.json({
            status:"Failed",
            message:e.message
        })
    }
})



app.use("*",(req,res)=>{
    res.sendStatus(404);
})

module.exports = app;