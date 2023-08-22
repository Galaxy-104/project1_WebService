const mongoose = require('mongoose')
const { Schema } = mongoose
const moment = require('moment')

const userSchema = new Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        trim: true,
    },
    imgUrl: {
        type: String,
        trim: true,
    },
    height: {
        type: Number,
    },
    weight: {
        type: Number,
    },
    goal: {
        type: Number,
    },
    isAdmin: {
        type: Boolean,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

const User = mongoose.model('User', userSchema)
module.exports = User