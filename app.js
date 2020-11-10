const path = require('path')

const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const authRouter = require('./src/routes/auth.routes')
const profileRouter = require('./src/routes/profile.routes')

const app = express()

app.use(express.json())
app.use(bodyParser.json())
app.use(cors())

app.use('/auth', authRouter)
app.use('/node-profile', profileRouter)


app.use('/', express.static(path.join(__dirname, 'Fasal')))

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'Fasal', 'index.html'))
})

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(async res => {
  await app.listen(process.env.PORT)
  console.log('Connected on port : ' + process.env.PORT);
})
  .catch(err => {
    console.log(err);
  })
