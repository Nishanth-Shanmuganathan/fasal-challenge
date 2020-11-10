const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')


const { saveProfileDetails, fetchImage, fetchProfileDetails } = require('./../controllers/profile.controller')
const { authenticater } = require('./../controllers/auth.controller')


const profileRouter = express.Router()
profileRouter.use(bodyParser.json())

const profilePicture = multer({
  limits: {
    fileSize: 100000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/i)) {
      return cb(new Error('Invalid file format'))
    }
    cb(undefined, true)
  }
})

profileRouter.post('', authenticater, profilePicture.single('profilePicture'), saveProfileDetails,
  (error, req, res, next) => {
    res.status(400).send({
      message: error.message
    })
  })

profileRouter.get('/', authenticater, fetchProfileDetails)

module.exports = profileRouter
