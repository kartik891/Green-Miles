import User from "../models/user.js";

export const handleDelete = async (req, res) =>{
    const { userId } = req.user;

    try{
        const deleteUser = await User.deleteOne({ _id: userId });

        if(deleteUser.deletedCount === 0){
            return res.send({status: false, message: "User not found"});
        }

        res.clearCookies('jwtCookie', { httpOnly: true, samSite: "strict" });

        return res.send({status: true, message: "User deleted Successfully!"});
    }
    catch(error){
        return res.send({status: false, message: "Error while deleting the user"});
    }
}