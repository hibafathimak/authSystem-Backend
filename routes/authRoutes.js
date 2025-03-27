const express = require("express")
const userController = require('../controllers/userControllers')
const router = new express.Router()
const jwtmiddleware = require("../middlewares/jwt")

router.post('./auth/register', userController.registerUserController)
router.post('./auth/login', userController.loginUserController)
router.get('./auth/users/profile/:id', jwtmiddleware, userController.registerUserController)

module.exports = router
