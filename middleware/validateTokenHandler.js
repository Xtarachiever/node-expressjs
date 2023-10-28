const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req,res,next) =>{
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization;
    try{
        if(authHeader && authHeader.startsWith("Bearer")){
            token = authHeader.split(" ")[1];
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err, decoded)=>{
                if(err){
                    res.status(401);
                    throw new Error("User is not authorized")
                }
                req.user = decoded.user;
                next();
                
                if(!token){
                    res.status(401);
                    throw new Error("User is not Authorized or Token is missing ")
                }
            })
        }
    }catch(err){
        console.log(err)
        throw new Error(err)
    }

});

module.exports = validateToken;