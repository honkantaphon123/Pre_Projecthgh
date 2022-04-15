const router = require('express').Router()
const User = require('../models/User')

const bcrypt = require('bcrypt')
// Register API
router.post('/register', async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10)
    const hashPass = await bcrypt.hash(req.body.password, salt)
    const newUser = new User({
      fullname: req.body.fullname,
      telephone: req.body.telephone,
      email: req.body.email,
      password: hashPass
    })
    newUser.save()
    req.flash('message', 'Register Success!!!')
    res.redirect('/register')
  } catch (error) {
    console.log(error)
    res.status(500).json('Server error')
  }
})

// Login API
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    !user && res.status(400).json('อีเมลไม่ถูกต้อง')
    const validated = await bcrypt.compare(req.body.password, user.password)
    !validated && res.status(422).json('รหัสผ่านไม่ถูกต้อง')
    // const { password, ...others } = user._doc // Because we not sending password
    res.status(200).json('Login Success!!!')
    // req.flash('message', 'Login Success!!!')
    // return res.render('index')
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
