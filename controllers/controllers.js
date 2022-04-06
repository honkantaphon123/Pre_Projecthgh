const User = require('../models/User2')
const Product = require('../models/Product')
exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id

    User.findById(id)
      .then(data => {
        if (!data) {
          res.status(404).send({ message: 'Not found user with id ' + id })
        } else {
          res.send(data)
        }
      })
      .catch(err => {
        res.status(500).send({ message: 'Erro retrieving user with id ' + id })
      })
  } else {
    User.find()
      .then(user => {
        res.send(user)
      })
      .catch(err => {
        res.status(500).send({ message: err.message || 'Error Occurred while retriving user information' })
      })
  }
}

exports.findProduct = (req, res) => {
  if (req.query.id) {
    const id = req.query.id
    Product.findById(id)
      .then(data => {
        if (!data) {
          res.status(404).send({ message: 'Not found user with id ' + id })
        } else {
          res.send(data)
        }
      })
      .catch(err => {
        res.status(500).send({ message: 'Erro retrieving user with id ' + id })
      })
  } else {
    Product.find()
      .then(user => {
        res.send(user)
      })
      .catch(err => {
        res.status(500).send({ message: err.message || 'Error Occurred while retriving user information' })
      })
  }
}

exports.update = (req, res) => {
  if (!req.body) {
    return res
      .status(400)
      .send({ message: 'Data to update can not be empty' })
  }

  const id = req.params.id
  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({ message: `Cannot Update user with ${id}. Maybe user not found!` })
      } else {
        res.send(data)
      }
    })
    .catch(err => {
      res.status(500).send({ message: 'Error Update user information' })
    })
}

exports.delete = (req, res) => {
  const id = req.params.id

  User.findByIdAndDelete(id)
    .then(data => {
      if (!data) {
        res.status(404).send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` })
      } else {
        res.redirect('back')
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Could not delete User with id=' + id
      })
    })
}

exports.deleteProduct = (req, res) => {
  const id = req.params.id

  Product.findByIdAndDelete(id)
    .then(data => {
      if (!data) {
        res.status(404).send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` })
      } else {
        res.redirect('back')
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Could not delete User with id=' + id
      })
    })
}