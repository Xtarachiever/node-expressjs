const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// @desc POST all users
// @route POST /api/user
// @access public
const registerUser = asyncHandler(async (req,res)=>{
    const { email, username, password} = req.body;
    if(!email || !username || !password){
        res.status(400);
        throw new Error("All fields are mandatory")
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User already registered")
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        email,
        password: hashedPassword
    });
    if(user){
        res.status(201).json({_id: user.id, email: user.email})
    }else{
        res.status(400);
        throw new Error("User Data not Valid")
    }
    // res.json({message:"Registered the user"})
});

// @desc POST all users
// @route POST /api/user
// @access public
const loginUser = asyncHandler(async (req,res)=>{
    const { email, password } = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory")
    }
    const user = await User.findOne({ email });
    // Compare password with hashed password
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            // Payload we will embed in our token
            user:{
                username: user.username,
                email: user.email,
                id: user.id
            }
        }, process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "20m"}
        )
        res.status(200).json({ accessToken });
    }else{
        res.status(401);
        throw new Error("Email or password is not valid")
    }
});

// @desc POST all users
// @route POST /api/user
// @access private
const currentUser = asyncHandler(async (req,res)=>{
    res.json(req.user)
});

module.exports = { registerUser, loginUser, currentUser }