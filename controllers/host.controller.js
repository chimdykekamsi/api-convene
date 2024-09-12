const Host = require("../models/host.model");
const asyncHandler = require("express-async-handler");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const hostRegister = asyncHandler(async(req,res)=>{
    const { name, email, password } = req.body;

    if(!email.includes('@')) {
        res.status(400);
        throw new Error("Invalid Email Address")
    }
    const existingHost = await Host.findOne({ email });
    
    if(existingHost) {
        res.status(400);
        throw new Error("Host already Exists")
    }
    const trimmedName = name.trim();
    if(!trimmedName.includes(' ')) {
        res.status(400);
        throw new Error("name requires first and lastname seperated by a space")
    }
    
    const hashedPassword = crypto
        .createHash("sha256")
        .update(password)
        .digest("hex");

    const host = await Host.create({ name: trimmedName, email, password: hashedPassword });
    if(!host){
        res.status(400);
        throw new Error("Failed to create Host")
    }
    res.status(201).json({
        sucess: true,
        data: host,
    });
});

const hostLogin = asyncHandler(async(req,res)=>{
    const { email, password } = req.body;

    const host = await Host.findOne({ email });

    if(!host) {
        res.status(401);
        throw new Error("Invalid Email or Password")
    }
    
    const hashedPassword = crypto
       .createHash("sha256")
       .update(password)
       .digest("hex");

    if(host.password!== hashedPassword) {
        res.status(401);
        throw new Error("Invalid Email or Password")
    }
    
    // Generate JWT token
    const token = jwt.sign({ id: host._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({
        success: true,
        token,
    });
});

const authorizedHost = asyncHandler(async(req,res)=>{
    const { validated } = req;
    const ValidatedHost = await Host.findById(validated.id);
    
    if(!ValidatedHost) {
        res.status(401);
        throw new Error("Unauthorized Access")
    }
    
    res.status(201).json({
        success: true,
        data: ValidatedHost,
    });
});

const fetchAll = asyncHandler(async(req,res)=>{
    const hosts = await Host.find({});
    res.status(201).json(hosts);
})

const requestEmailVerify = asyncHandler(async(req,res)=>{
    const { validated } = req;
    const ValidatedHost = await Host.findById(validated.id);
    
    if(!ValidatedHost) {
        res.status(401);
        throw new Error("Oops!, Access denied")
    }

    const {email} = validatedHost;
    const hashedKey = crypto
    .createHash("sha256")
    .update(email)
    .digest("hex");

    // Send hashed key to email

    return res.status(200).json({
        status: true,
        message: "Great Job!, Please check your inbox for a verification mail"
    })
})

module.exports = {
    hostRegister,
    hostLogin,
    authorizedHost,
    fetchAll
}