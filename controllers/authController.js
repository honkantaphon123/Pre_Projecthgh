const User = require('../models/User2')
const Product = require('../models/Product')
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

const createUserToken2 = async (user, code, req, res) => {
  const token = signToken(user._id)

  // cookie settings
  res.cookie('jwt', token, {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  })

  // remove user password from output
  user.password = undefined
  res.redirect('/admin')
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

exports.registerByadmin = async (req, res, next) => {
  // pass in request data here to create user from user schema
  try {
    const newUser = await User.create({
      fullname: req.body.fullname,
      telephone: req.body.telephone,
      email: req.body.email,
      password: req.body.password

    })
    createUserToken2(newUser, 201, req, res)
    // if user can't be created, throw an error
  } catch (err) {
    next(err)
    req.flash('msg', 'Telephone or E-mail already exists')
    res.redirect('/add-user')
  }
}
exports.Login = async (req, res, next) => {
  // pass in request data here to create user from user schema
  try {
    const user = await User.findOne({ email: req.body.email })
    if (user) {
      req.session.fullname = user.fullname
      req.session._id = user._id
    }
    if (!user) {
      req.flash('msg', 'Wrong E-mail')
      res.redirect('/login')
    }
    const validated = await bcrypt.compare(req.body.password, user.password)
    if (validated === false) {
      req.flash('msg', 'Wrong Password')
      res.redirect('/login')
    }
    const admin = user.isAdmin
    if (admin === true) {
      res.redirect('/admin')
    } else { res.redirect('/index2') }

    // if user can't be created, throw an error
  } catch (err) {
    next(err)
  }
}

exports.update = (req, res) => {
  if (!req.body) {
    return res
      .status(400)
      .send({ message: 'Data to update can not be empty' })
  }

  const id = req.body.id
  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({ message: `Cannot Update user with ${id}. Maybe user not found!` })
      } else {
        res.redirect('/admin')
      }
    })
    .catch(err => {
      req.flash('msg', 'E-mail or Telephone are duplicate')
      res.redirect('back')
    })
}

exports.updateProduct = (req, res) => {
  if (!req.body) {
    return res
      .status(400)
      .send({ message: 'Data to update can not be empty' })
  }
  const id = req.body.id
  let new_image = ''
  if (req.file) {
    new_image = req.file.filename
    try {
      fs.unlinksync('./uploads/' + req.body.old_image)
    } catch (err) {
      console.log(err)
    }
  } else new_image = req.body.old_image

  Product.findByIdAndUpdate(id, {
    name: req.body.name,
    categories: req.body.categories,
    price: req.body.price,
    img: new_image
  }, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({ message: `Cannot Update user with ${id}. Maybe user not found!` })
      } else {
        res.redirect('/product')
      }
    })
    .catch(err => {
      req.flash('msg', 'Product Name is duplicate')
      res.redirect('back')
    })
}
