import User from "../models/user.js";

export const handleDeviceLogout = async (req, res) =>{
    const  {userId}  = req.user;

    if(!userId){
        return res.send({status: false, message: "User Not Found"});
    }

    try{
        const existingUser = await User.findOne({ _id: userId });

        if(!existingUser){
            return res.send({status: false, message: "User not found"});
        }

        res.clearCookie('jwtCookie', { httpOnly: true });
        
        return res.send({status: true, message: "User Logged out from this Device"});
    }catch(err){
        return res.send({status: false, message: "Error while trying to logout"});
    }
}