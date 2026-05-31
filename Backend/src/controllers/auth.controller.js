import userModel from "../models/user.model.js";
import blackListModel from "../models/blacklist.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async(req,res) => {
    try {
        const {username, email, password} = req.body;
        
        if (!username || !email || !password){
            return res.status(400).json({message: "All fields are required"});
        }

        const existingUser = await userModel.findOne({$or: [{email}, {username}]});

        if (existingUser){
            return res.status(400).json({message: "User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            username,
            email,
            password: hashedPassword
        });

        const token = jwt.sign(
            {id: user._id, username: user.username},
            process.env.JWT_SECRET,
            {expiresIn: "1h"}
        );

        return res.status(201).json({message: "User created successfully", user:{id: user._id, username: user.username, email: user.email}});
    } catch (error) {
        return res.json({message:"failed", error:error.message})
    }
}

export const loginUser = async(req,res) => {
    const {email,password} = req.body;

    if(!email || !password){
        return res.status(400).json({message: "All fields are required"});
    }

    const user = await userModel.findOne({email});
    
    if(!user){
        return res.status(404).json({message: "User not found"});
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
        return res.status(401).json({message: "Invalid password"});
    }

    const token = jwt.sign(
        {id: user._id, username: user.username},
        process.env.JWT_SECRET,
        {expiresIn: "1h"}
    );

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 3600000 // 1 hour
    });
res.status(200).json({message: "User logged in successfully", user:{id: user._id, username: user.username, email: user.email}});
}

export const logoutUser = async(req,res)=>{
    try {
        const token = req.cookies?.token;
        if(token){
            await blackListModel.create({token});
        }
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        });
        res.status(200).json({message: "User logged out successfully"});
    } catch (error) {
        return res.json({message: "failed", error:error.message});
    }
}

export const getUser = async(req,res) => {
    try {
        const user = await userModel.findById(req.user.id);
        res.status(200).json({
            message: "User fetched successfully",
            user:{
            id: user._id,
            username: user.username,
            email: user.email
        }
    });
    } catch (error) {
        return res.json({message: "failed", error:error.message});
    }
}