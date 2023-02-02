require("dotenv").config();
const jwt = require("jsonwebtoken");

async function auth(req,res,next){
    let token  = req.headers.authorization;
    // console.log(process.env.KEY);
    try{
        const decoded = jwt.verify(token,process.env.KEY);
        req.user = decoded.user;
        next();
    }catch(e){
        res.status(400).json({
            status:"failed",
            message:"invalid token"
        })
    }
}

module.exports = auth;