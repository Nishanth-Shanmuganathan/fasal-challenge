const User = require('./../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { registrationMail } = require('./../mails/forget-password.mail')

exports.loginController = async (req, res) => {
  const email = req.body.email.trim()
  const password = req.body.password.trim()
  try {
    const user = await User.findOne({ email })
    if (!user) throw new Error()
    const match = await bcrypt.compare(password, user.password)
    if (!match) throw new Error()

    const token = jwt.sign({ id: user._id }, process.env.JWT_STRING)
    user.token = token
    await user.save()
    res.status(200).send({ message: 'Login successful...', token })
  } catch (error) {
    res.status(400).send({ message: 'Authentication failed' })
  }
}
exports.registerController = async (req, res) => {
  try {
    const email = req.body.email
    const password = await bcrypt.hash(req.body.password, 8)

    const user = new User({
      email, password
    })

    const token = jwt.sign({ id: user._id }, process.env.JWT_STRING)
    user.token = token
    const result = await user.save()
    res.status(200).send({ message: 'Registration successful...', token })
  } catch (error) {
    if (error.message.includes('email')) {
      return res.status(400).send({ message: 'Email-Id already exists' })
    }
    res.status(400).send({ message: 'Registration failed. Please register again...' })
  }
}
exports.authenticater = async (req, res, next) => {
  const token = req.headers.authorization.replace('Bearer ', '')
  try {
    const { id } = jwt.decode(token)
    console.log(id);
    const user = await User.findOne({ _id: id })
    console.log(user);
    if (!user) {
      throw new Error('Authentication failed')
    }
    req.user = user
    next()
  } catch (error) {
    res.status(401).send({ message: 'Authentication failed' })
  }
}

exports.logout = async (req, res) => {
  const id = req.user._id
  try {
    const user = await User.findById(id)
    user.token = ''
    await user.save()
    res.status(200).send({ message: 'Logged out successfully...' })
  } catch (error) {
    res.status(400).send({ message: 'Unable to logout...' })
  }
}

exports.forgotPassword = async (req, res) => {
  const mail = req.params.mailId
  try {
    await registrationMail(mail)
    res.status(200).send({ message: 'Password reset link sent to your mail. Kindly check your inbox...' })
  } catch (error) {
    res.status(400).send({ message: 'Unable to sent reset link. Try again...' })
  }
}

exports.resetPassword = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).send({ message: 'E-mail id does not exixts...' })
    }
    user.password = await bcrypt.hash(password.trim(), 8)
    await user.save()
    res.status(200).send({ message: 'Password reset successful. Please login to continue...' })
  } catch (error) {
    res.status(400).send({ message: 'Unable to reset password. Try again...' })
  }
}
