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

router.post('/login', expressAsyncHandler(async (req, res, next) => { // /api/users/login
    console.log(req.body)
    const loginUser = await User.findOne({
        userId: req.body.userId,
        password: req.body.password,
    })
    if(!loginUser){
        res.status(401).json({ code: 401, message: 'Invalid Email or Password'})
    }else{
        const { name, email, userId, isAdmin, createdAt } = loginUser
        res.json({
            code: 200,
            token: generateToken(loginUser),
            user_name, email, userId, isAdmin, createdAt
        })
    }
})) 

router.put('/account', isAuth, expressAsyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id)
    if(!user){
        res.status(404).json( { code: 404, message: 'User Not Found'})
    }else{
        user.imgUrl = req.body.imgUrl || user.imgUrl
        user.user_name = req.body.user_name || user.user_name
        user.password = req.body.password || user.password
        user.isAdmin = req.body.isAdmin || user.isAdmin
        user.lastModifiedAt = new Date() // 수정 시간 업데이트

        const updatedUser = await user.save() // DB에 사용자정보 업데이트
        const { name, email, userId, isAdmin, createdAt } = updatedUser
        res.json({
            code: 200,
            token: generateToken(updatedUser),
            user_name, email, userId, isAdmin, createdAt
        })
    }
}))

module.exports = router