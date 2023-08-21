const mongoose = require('mongoose')

const { Schema } = mongoose
const { Types: { ObjectId } } = Schema

const RecordSchema = new Schema({
    author: {
        type: ObjectId,
        required: true,
        ref: 'User',
    },
    date: {
        type: Date,
        require: true,
    },
    category: {
        type: String,
        required: true,
        trim: true,
    },
    name: {
        type: String,
        require: true,
        trim: true,
    },
    calorie: {
        type: Number,
        require: true,
    },
    imgUrl: {
        type: String,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    lastModifiedAt: {
        type: Date,
        default: Date.now,
    },
})

const Record = mongoose.model('Record', RecordSchema)
module.exports = Record