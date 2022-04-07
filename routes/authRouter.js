const express = require('express')
const authController = require('./../controllers/authController')
const router = express.Router()
const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (neq, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '_' + Date.now() + '_' + file.originalname)
  }
})
const upload = multer({
  storage: storage
}).single('image')
router.post('/register', authController.registerUser)

router.post('/admin/register', authController.registerByadmin)

router.post('/update', authController.update)

router.post('/product/update', upload, authController.updateProduct)

router.post('/login', authController.Login)

module.exports = router
