require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const usersRouter = require('./routes/users')

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log("Database Connected"))

app.use(express.json())

app.use('/users', usersRouter)

app.listen(3000, () => console.log("Server Started"))
