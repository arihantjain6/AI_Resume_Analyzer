import jwt from "jsonwebtoken";
import blackListModel from "../models/blacklist.model.js";
export const authMiddleware = async (req,res,next) => {
    try{
        const token = req.cookies?.token;
        if(!token){
            return res.status(401).json({message:"Token not provided"});
        }

        const isTokenBlacklisted = await blackListModel.findOne({token});
        if(isTokenBlacklisted){
            return res.status(401).json({message:"Token is blacklisted, Login again to continue"});
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken;
        next();
    }catch(error){
        return res.status(500).json({message:"Internal server error", error: error.message});
    }
}