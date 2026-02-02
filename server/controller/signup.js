import User from "../models/user.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const namePattern = /^[a-zA-Z0-9_-]{6,}$/;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const handleSignUp = async (req, res) => {
    try {
        const { email, username, password } = req.body;

        if (!email || !password || !username) {
            return res.send({ status: false, message: "All fields are required" });
        }

        const validFields = namePattern.test(username) && emailPattern.test(email) && passwordPattern.test(password);

        if (!validFields) {
            return res.send({ status: false, message: "Fields do not match." })
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.send({ status: false, message: "Email already registered" });
        }

        const hash = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            username,
            password: hash,
            tokenVersion: 1
        });

        await newUser.save();

        const token = jwt.sign({ userId: newUser._id, username: username, tokenVersion: newUser.tokenVersion}, process.env.SECRET_KEY);
        
        res.cookie('jwtCookie', token, { httpOnly: true, maxAge: 8*3600000 });
        return res.send({ status: true, message: "The SignUp was Successful"});

    }
    catch (error) {
        res.send({ status: false, message: "Internal Server Error" });
    }

}