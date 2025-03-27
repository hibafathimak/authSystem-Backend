const express = require('express')
const cors = require('cors')
require('dotenv').config()
require('./config/DbConnection')
require('express-validator')

const serverApp = express()
const router = require("./routes/authRoutes")

serverApp.use(cors())
serverApp.use(express.json())
serverApp.use(router)

const PORT = 3000 || process.env.PORT

serverApp.listen(PORT, () => {
    console.log("server started running");
    
})
serverApp.get('/', (req, res) => {
    res.status(200).send("server started running")
})