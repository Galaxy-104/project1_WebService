const dotenv = require('dotenv')

// process.env .env 파일의 환경변수 주입
dotenv.config() 

// console.log(process.env)

module.exports = {
  MONGODB_URL: process.env.MONGODB_URL,
  JWT_SECRET: process.env.JWT_SECRET,
}