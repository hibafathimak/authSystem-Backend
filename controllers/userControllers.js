const users = require('../models/userModel')
const bcrypt = require('bcrypt')
const { check } = require('express-validator')
const jwt = require('jsonwebtoken')

exports.registerUserController = async (req, res) => {
    try {
        const { username, email, password, name } = req.body
        check(email).isEmail().withMessage("Invalid email")
        check('password', 'The password must be at least 8 characters, and must contain a symbol')
            .isLength({ min: 8 })
            .matches(/[-_$#]/);
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            res.status(401).json("User Already Exists!")
        } else {
  
                const hashedPassword = await bcrypt.hash(password, 10)
                const newUser = new users({
                    username, email, password: hashedPassword, name
                })
                const user = await newUser.save()
            res.status(201).json(user)
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

exports.loginUserController = async (req, res) => {
    try {
        const { email, password } = req.body
        console.log(req.body)
        const existingUser = await users.findOne({ email })
        console.log(existingUser)
        if (!existingUser) {
            res.status(401).json("UserName Not Registered !")
        } else {
            const matchPassword = bcrypt.compare(password, existingUser.password)
            if (matchPassword) {
                const token = jwt.sign({ userId: existingUser._id }, process.env.JWTPASSWORD)
                res.status(200).json(existingUser)
            } else {
                res.status(404).json("Invalid Credentials")
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

exports.getUserController = async (req, res) => {
    try {
        const { id } = req.params
        const user = await users.findById(id)
        if (user) {
            res.status(200).json(user)
        }
    } catch (error) {
        res.status(500).json(error)
    }
}