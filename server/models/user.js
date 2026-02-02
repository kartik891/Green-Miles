import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    tokenVersion: {
        type: Number,
        default: 0
    }
});

export default mongoose.model("User", UserSchema);