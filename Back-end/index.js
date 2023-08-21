const express = require('express')
const app = express()
const cors = require('cors')
const logger = require('morgan') // 요청 기록
const mongoose = require('mongoose') // mongodb 모듈 연결
const usersRouter = require('./src/routes/users')
const recordsRouter = require('./src/routes/records')
const config = require('./config')

// const corsOptions = { // CORS 옵션
//     origin: 'http://127.0.0.1:5500', // 해당 URL 주소만 요청을 허락함
//     credentials: true // 사용자 인증이 필요한 리소스를 요청할 수 있도록 허용함
// }

// mongodb 연결하기
mongoose.connect(config.MONGODB_URL)
.then(() => console.log('mongodb connected...'))
.catch(e => console.log(`failed to connect mongodb: ${e}`))


app.use(express.json()) // request body 파싱
app.use(logger('tiny')) // Logger 설정

app.use('/api/users', usersRouter)
app.use('/api/records', recordsRouter)

app.use( (req, res, next) => { // 사용자가 요청한 페이지가 없는 경우
    res.status(404).send("Page Not Found")
})
app.use( (err, req, res, next)=> { // 서버 내부 오류처리 
    console.error(err.stack)
    res.status(500).send('Internal Server Error')
})
app.listen (5000, () => {
    console.log( 'server is running on port 5000...')
})