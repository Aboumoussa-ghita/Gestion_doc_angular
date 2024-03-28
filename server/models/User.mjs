import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    dateRegistered: {
        type: Date,
        default: Date.now
    },
    accountStatus: {
        type: String,
        enum: ['active', 'suspended', 'closed'],
        default: 'active'
    }
});

export default mongoose.model('User', userSchema);