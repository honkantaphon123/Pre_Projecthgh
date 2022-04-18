const mongoose = require('mongoose')
const validator = require('validator')
const Schema = mongoose.Schema

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
  room: {
    type: String,
    minLength: [3],
    maxLength: [3],
    required: true
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
