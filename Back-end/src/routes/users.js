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
        return res.cookie('token', generateToken(loginUser),{
            domain: 'http://127.0.0.1:5501',
            sameSite:'none',
            secure: true, // https, ssl 모드에서만
            maxAge: 1000*60*60*24*1, // 1D
            httpOnly: true, // javascript 로 cookie에 접근하지 못하게 한다.
            // domain: 'localhost'
        }).json({
            code: 200,
            name, email, userId, isAdmin, createdAt
        })
    }
})) 

// 페이지 이동시 유저 정보 불러오기
router.get('/user', isAuth, expressAsyncHandler(async (req, res, next) => {
    const user = await User.findOne({
        _id: req.user._id
    })
    console.log(user)
    const { name, userId, email, contact, height, weight, goal, imgUrl } = user

    res.json({ 
        code: 200,
        user: { name, userId, email, contact, height, weight, goal, imgUrl } 
    })


}))

// 계정 정보 수정하기
router.put('/account', isAuth, expressAsyncHandler(async (req, res, next) => {
    const user = await User.findOne({
        _id: req.user._id
    })
    if(!user){
        res.status(404).json( { code: 404, message: 'User Not Found'})
    }else{
        user.name = req.body.name || user.name
        if(req.body.password === ""){
            user.password = user.password
        }else{
            user.password = req.body.password
        }
        user.contact = req.body.contact,
        user.height = req.body.height,
        user.weight = req.body.weight,
        user.lastModifiedAt = new Date() // 수정 시간 업데이트

        const updatedUser = await user.save() // DB에 사용자정보 업데이트
        const { name, userId, email, contact, height, weight, goal, imgUrl } = updatedUser
        res.json({
            code: 200,
            user: { name, userId, email, contact, height, weight, goal, imgUrl } 
        })
    }
}))

// 프로필 이미지 저장하기
router.post('/profile', isAuth, expressAsyncHandler (async (req, res, next) => {
    
}))

module.exports = router