const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    password: { type: String },
    name: { type: String }
})

const users = mongoose.model("users", schema)

module.exports = users