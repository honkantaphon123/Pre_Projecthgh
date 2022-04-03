const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
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
  password: {
    type: String,
    required: [true, 'Enter a password.']
  },
  isAdmin: {
    type: Boolean,
    default: false
  }

})

// schema middleware to apply before saving
userSchema.pre('save', async function (next) {
  // hash the password, set hash cost to 12
  this.password = await bcrypt.hash(this.password, 12)

  next()
})

const User = mongoose.model('User', userSchema)
module.exports = User
