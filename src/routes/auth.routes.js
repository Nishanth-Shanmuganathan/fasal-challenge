const express = require('express')
const bodyParser = require('body-parser')

const { loginController, registerController, logout, forgotPassword, resetPassword, authenticater } = require('./../controllers/auth.controller')

const authRouter = express.Router()

authRouter.use(bodyParser.json())

authRouter.post('/login', loginController)

authRouter.post('/register', registerController)

authRouter.get('/forget-password/:mailId', forgotPassword)

authRouter.post('/reset-password', resetPassword)

authRouter.get('/logout', authenticater, logout)



module.exports = authRouter

