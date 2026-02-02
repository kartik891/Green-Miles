import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const authorizeLogin = async (req, res, next) => {
    const token = req.cookies.jwtCookie;

    if (!token) {
        return res.send({ status: false, message: "Not Loggedin" });
    }

    try {
        const decode = jwt.verify(token, process.env.SECRET_KEY);

        const user = await User.findOne({ _id: decode.userId });
        
        if(user && decode.tokenVersion === user.tokenVersion){
            req.user = decode;
            next();
        }else{
            return res.send({status: false, message: "Expired Login"});
        }
    } catch (error) {
        return res.send({ status: false, message: "Expired Login" });
    }
}