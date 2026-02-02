import User from "../models/user.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const changePassword = async (req, res) =>{
    const {userId}  = req.user;
    const { oldPassword, newPassword } = req.body;

    if(!userId){
        return res.send({status : false, message: "Login Not found"});
    }

    try{
        const existingUser = await User.findOne({ _id: userId });
        if(!existingUser){
            return res.send({status: false, message: "User not found"});
        }

        const isValid = await bcrypt.compare(oldPassword, existingUser.password);

        if(isValid){
            const newHash = await bcrypt.hash(newPassword, 10);
            existingUser.password = newHash;
            existingUser.tokenVersion += 1;
            await existingUser.save();
            
            const token = jwt.sign({userId: existingUser._id, username: existingUser.username, tokenVersion: existingUser.tokenVersion }, process.env.SECRET_KEY);

            res.cookie('jwtCookie', token, {httpOnly: true, maxAge: 8*60*60*1000});

            return res.send({status: true, message: "Password Changed successful"});
        }else{
            return res.send({status: false, message: "Old password do not match"});
        }

    }
    catch(err){
        res.send({status: false, message: "Error while changing Password"});
    }

}