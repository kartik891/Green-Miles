import User from "../models/user.js";
import jwt from 'jsonwebtoken';

export const handleLogout = async (req, res) =>{
    const  {userId}  = req.user;

    if(!userId){
        return res.send({status: false, message: "User Not Found"});
    }

    try{
        const existingUser = await User.findOne({ _id: userId });

        if(!existingUser){
            return res.send({status: false, message: "User not found"});
        }

        existingUser.tokenVersion += 1;
        
        await existingUser.save();

        const token = jwt.sign({userId: existingUser._id, username: existingUser.username, tokenVersion: existingUser.tokenVersion}, process.env.SECRET_KEY);

        res.cookie('jwtCookie', token, { httpOnly: true, maxAge: 8*60*60*1000});

        return res.send({status: true, message: "User Logged out from all Sessions"});
    }catch(err){
        return res.send({status: false, message: "Error while trying to logout"});
    }
}