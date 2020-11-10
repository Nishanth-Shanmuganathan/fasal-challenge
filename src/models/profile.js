const mongoose = require('mongoose')

const profileSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  profilePicture: {
    type: String
  }
})

module.exports = mongoose.model('Profile', profileSchema)
