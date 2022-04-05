const express = require('express')
const authController = require('./../controllers/authController')
const router = express.Router()

router.post('/register', authController.registerUser)

router.post('/admin/register', authController.registerByadmin)

router.post('/update', authController.update)

router.get('/delete', authController.delete)

router.post('/login', authController.Login)

module.exports = router
