import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required:false,
    },
    phone: {
        type: String,
        required: false,
        unique:true
    },
    address: {
        type: {},
        required: false,
    },
    answer: {
        type: String,
        required: false,
    },
    role: {
        type: Number,
        default: 0,
    },
    googleId: {
        type: String,
        required: false,
    }
}, { timestamps: true });

userSchema.methods.generateJWT = function() {
    const token = jwt.sign(
        { _id: this._id }, // Payload
        process.env.JWT_SECRET, // Secret key
        { expiresIn: '1h' } // Token expiration time
    );
    return token;
};

export default mongoose.model('user',userSchema);