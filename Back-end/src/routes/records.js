const express = require('express')
const Record = require('../models/Record')
const expressAsyncHandler = require('express-async-handler')
const { isAuth } = require('../../auth')

const mongoose = require('mongoose')
const { Types: { ObjectId } } = mongoose

const router = express.Router()

router.get('/', isAuth, expressAsyncHandler(async (req, res, next) => {
    const records = await Record.find({ author: req.user._id}).populate('author')
    const todayRecords = records.map(function(record){
        return { date: record.date,
            category: record.category, 
            name: record.name, 
            calorie: record.calorie,
            id: record._id
        }
    })
    if(records.length === 0){
        res.status(404).json({ code: 404, message: "Failed to find records"})
    }else{
        res.json({ 
            code: 200, todayRecords })
    }
}))

router.get('/:id', isAuth, expressAsyncHandler(async (req, res, next) => {
    const records = await Record.find({
        author: req.user._id,
        _id: req.params.id
    })
    if(!records){
        res.status(404).json({ code: 404, message: 'Records Not Found'})
    }else{
        res.json({ code: 200, todo})
    }
}))

router.post('/', isAuth, expressAsyncHandler(async (req, res, next) => {
    const record = new Record({
        author: req.user._id,
        date: req.body.date,
        category: req.body.category,
        name: req.body.name,
        calorie: req.body.calorie,
        imgUrl: req.body.imgUrl,
    })
    const newRecord = await record.save()

    if(!newRecord){
        res.status(401).json({ code: 401, message: "Failed to save record"})
    }else{
        const { date, category, name, calorie, _id } = newRecord
        res.status(201).json({
            code: 201,
            message: 'New record created',
            record: { _id, date, category, name, calorie }
        })
    }
}))

router.put('/:id', isAuth, expressAsyncHandler(async (req, res, next) => {
    const record = await Record.findOne({
        author: req.user._id,
        _id: req.params.id
    })
    if(!record){
        res.status(404).json({ code: 404, message: 'Record Not Found'})
    }else{
        record.date = req.body.date || record.date
        record.category = req.body.category || record.category
        record.name = req.body.name || record.name
        record.calorie = req.body.calorie || record.calorie
        record.imgUrl = req.body.imgUrl || record.imgUrl
        record.lastModifiedAt = new Date()
    }
    const updatedRecord = await record.save() // 실제 DB에 업데이트
    res.json({
        code: 200,
        message: 'Record Updated',
        updatedRecord
    })
}))

router.delete('/:id', isAuth, expressAsyncHandler(async (req, res, next) => {
    const record = await Record.findOne({
        author: req.user._id,
        _id: req.params.id
    })
    if(!record){
        res.status(404).json({ code: 404, message: 'Record Not Found'})
    }else{
        await Record.deleteOne({
            author: req.user._id,
            _id: req.params.id
        })
        res.status(204).json({ code: 204, message: 'Record deleted successfully'})
    }
}))

module.exports = router
