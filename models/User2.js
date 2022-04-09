const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const Schema = mongoose.Schema
const Product = require('./Product')

const userSchema = new Schema({
  fullname: {
    type: String,
    required: [true, 'Enter a fullname.']
  },
  telephone: {
    type: String,
    unique: [true, 'That telephone is taken.'],
    required: [true, 'Enter a valid telephone.'],
    minLength: [10, 'telephone should be at least 10 characters'],
    maxLength: [10, 'telephone should be max 10 characters']
  },
  email: {
    type: String,
    require: [true, 'Enter an email address.'],
    unique: [true, 'That email address is taken.'],
    lowercase: true,
    validate: [validator.isEmail, 'Enter a valid email address.']
  },
  password: {
    type: String,
    required: [true, 'Enter a password.']
  },
  isAdmin: {
    type: Boolean,
    default: false
  }

})

const User = mongoose.model('User', userSchema)
module.exports = User
