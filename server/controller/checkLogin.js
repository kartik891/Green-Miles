import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import mongoose from 'mongoose';

export const checkLogin = async (req, res) => {
    const token = req.cookies.jwtCookie;

    if (!token) {
        return res.send({ status: false, message: "Login to display the media" });
    }

    try {
        const valid = jwt.verify(token, process.env.SECRET_KEY);

        if (!mongoose.Types.ObjectId.isValid(valid.userId)) {
            return res.send({ status: false, message: "Invalid user ID" });
        }

        if (valid) {
            const userId = new mongoose.Types.ObjectId(valid.userId);

            const user = await User.findOne({ _id: userId });

            if (user && user.tokenVersion && valid.tokenVersion) {
                return res.send({ status: true, message: "User is Logged in", user: user });
            }
            else {
                return res.send({ status: false, message: "Error retrieving the user data" });
            }
        }
    } catch {
        return res.send({ status: false, message: "Please login again" });
    }

}