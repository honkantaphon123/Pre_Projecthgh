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

// Register API
// router.post('/register', async (req, res) => {
//   const salt = await bcrypt.genSalt(10)
//   const hashPass = await bcrypt.hash(req.body.password, salt)
//   const email = await User.findOne({ email: req.body.email })
//   const tel = await User.findOne({ telephone: req.body.telephone })
//   const newUser = new User({
//     fullname: req.body.fullname,
//     telephone: req.body.telephone,
//     email: req.body.email,
//     password: hashPass
//   })
//   if (email != null) {
//     req.flash('message', 'E-mail! Already Exits')
//     res.redirect('/register')
//   } else if (tel != null) {
//     req.flash('message', 'Telephone Already Exits')
//     res.redirect('/register')
//   } else if (tel != null && email != null) {
//     req.flash('message', 'Telephone & Email Already Exits')
//     res.redirect('/register')
//   } else {
//     newUser.save()
//     req.flash('message', 'Register Success!!!')
//     res.redirect('/login')
//   }
// })

// Login API
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    !user && res.status(400).json('Wrong E-mail')
    const validated = await bcrypt.compare(req.body.password, user.password)
    !validated && res.status(422).json('Incorrect Password')
    // const { password, ...others } = user._doc // Because we not sending password
    res.status(200).json('Login Success!!!')
    // req.flash('message', 'Login Success!!!')
    // return res.render('index')
  } catch (err) {
    res.status(500).json(err)
  }
})

// router.post('/login', async (req, res) => {
//   const user = await User.findOne({ email: req.body.email })
//   const validated = await bcrypt.compare(req.body.password, user.password)
//   console.log(user)
//   console.log(validated)
//   if (!user) {
//     req.flash('message', 'Wrong E-mail')
//     res.redirect('/login')
//     console.log('message')
//   } else if (!validated) {
//     req.flash('message', 'Wrong Password!!!')
//     res.redirect('/login')
//   } else { return res.render('index') }
// })

module.exports = router
