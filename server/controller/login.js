import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import bcrypt from 'bcrypt';

export const handleLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.send({ status: false, message: "Input is required" });
    }

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {

            const isValid = await bcrypt.compare(password, existingUser.password);

            if (isValid) {
                const token = jwt.sign({ userId: existingUser._id, username: existingUser.username, tokenVersion: existingUser.tokenVersion }, process.env.SECRET_KEY);

                res.cookie('jwtCookie', token, { httpOnly: true, maxAge: 8*360000 });

                return res.send({ status: true, message: "Login Successful" });
            }
            else {
                return res.send({ status: false, message: "Wrong email or password.\nTry again" });
            }

        }
        else {
            return res.send({ status: false, message: "Wrong email or password.\nTry again" });
        }
    }
    catch (err) {
        return res.send({ status: false, message: "User is not registered" });
    }
}