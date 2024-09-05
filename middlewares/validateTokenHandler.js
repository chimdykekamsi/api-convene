const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const Host = require("../models/host.model");

const validateToken = asyncHandler(
    async(req,res,next) =>{
        const authHeader = req.headers.authorization || req.headers.Authorization;
        if(!authHeader){
            return res.status(401).json({
                message: "No token provided"
            });
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token,process.env.JWT_SECRET,(err,decoded) => {
            if(err){
                res.status(401);
                throw new Error("Invalid token");
            };
            return decoded;
        });
        req.validated = decoded;
        next();
    }
)


module.exports = {
    validateToken
};