const express = require('express')
const User = require('../models/User')
const expressAsyncHandler = require('express-async-handler')
const { generateToken, isAuth } = require('../../auth')

const router = express.Router()

router.post('/join', expressAsyncHandler(async (req, res, next) => {
    console.log(req.body)
    const user = new User({
        userId: req.body.userId,
        password: req.body.password,
        email: req.body.email,
        name: req.body.name,
        contact: req.body.contact,
        height: req.body.height,
        weight: req.body.weight,
        goal: req.body.goal,
    })
    const newUser = await user.save()
    if(!newUser){
        res.status(401).json({ code: 401, message: 'Invalid User Date'})
    }else{
        const { name, email, userId, isAdmin, createdAt } = newUser
        console.log(newUser)
        res.json({
            code: 200,
            token: generateToken(newUser),
            name, email, userId, isAdmin, createdAt
        })
    }
}))

// 아이디 이메일 중복 확인
router.post('/join/check', expressAsyncHandler(async (req, res, next) => {
    const userId = await User.findOne({
        userId: req.body.userId
    })
    const userEmail = await User.findOne({
        email: req.body.email
    })

    if(userId || userEmail){
        res.json({ code: 401, message: 'E11000 duplicate key error'})
    }else{
        res.json({ code: 200 })
    }
}))

router.post('/login', expressAsyncHandler(async (req, res, next) => { // /api/users/login
    console.log(req.body)
    const loginId = await User.findOne({
        userId: req.body.userId
    })
    const loginUser = await User.findOne({
        userId: req.body.userId,
        password: req.body.password
    })

    if(!loginId){
        res.status(404).json({ code: 404, message: 'User Not Found'})
    }else if(!loginUser){
        res.status(401).json({ code: 401, message: 'Invalid ID or Password'})
    }else{
        const { name, email, userId, isAdmin, createdAt } = loginUser
        return res.cookie('user', generateToken(loginUser),{
            domain: 'http://127.0.0.1:5501',
            sameSite:'none',
            secure: true, // https, ssl 모드에서만
            maxAge: 1000*60*60*24*1, // 1D
            httpOnly: false, // javascript 로 cookie에 접근하지 못하게 한다.
        }).json({
            code: 200,
            name, email, userId, isAdmin, createdAt
        })
    }
})) 

router.put('/account', isAuth, expressAsyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id)
    if(!user){
        res.status(404).json( { code: 404, message: 'User Not Found'})
    }else{
        user.imgUrl = req.body.imgUrl || user.imgUrl
        user.name = req.body.name || user.name
        user.password = req.body.password || user.password
        user.isAdmin = req.body.isAdmin || user.isAdmin
        user.lastModifiedAt = new Date() // 수정 시간 업데이트

        const updatedUser = await user.save() // DB에 사용자정보 업데이트
        const { name, email, userId, isAdmin, createdAt } = updatedUser
        res.json({
            code: 200,
            token: generateToken(updatedUser),
            name, email, userId, isAdmin, createdAt
        })
    }
}))

module.exports = router