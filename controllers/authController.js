const User = require('../models/User2')
// const AppError = require('../utils/AppError')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  })
}

const createUserToken = async (user, code, req, res) => {
  const token = signToken(user._id)

  // cookie settings
  res.cookie('jwt', token, {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  })

  // remove user password from output
  user.password = undefined
  res.redirect('/login')
}

exports.registerUser = async (req, res, next) => {
  // pass in request data here to create user from user schema
  try {
    const newUser = await User.create({
      fullname: req.body.fullname,
      telephone: req.body.telephone,
      email: req.body.email,
      password: req.body.password

    })

    createUserToken(newUser, 201, req, res)
    // if user can't be created, throw an error
  } catch (err) {
    next(err)
    req.flash('msg', 'Telephone or E-mail already exists')
    res.redirect('/register')
  }
}
exports.Login = async (req, res, next) => {
  // pass in request data here to create user from user schema
  try {
    const user = await User.findOne({ email: req.body.email })
    req.session.fullname = user.fullname
    if (!user) {
      req.flash('msg', 'Wrong E-mail Or Password')
      res.redirect('/login')
    }
    const validated = await bcrypt.compare(req.body.password, user.password)
    if (validated == false) {
      req.flash('msg', 'Wrong E-mail Or Password')
      res.redirect('/login')
    }
    res.redirect('/index2')

    // if user can't be created, throw an error
  } catch (err) {
    next(err)
  }
}
