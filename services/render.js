const axios = require('axios')

exports.homeRoutes = (req, res) => {
  // Make a get request to /api/users
  axios.get('http://localhost:3000/api/users')
    .then(function (response) {
      const admin = req.session.fullname
      if (admin === undefined) {
        res.redirect('/login')
      } else res.render('admin', { users: response.data })
    })
    .catch(err => {
      res.send(err)
    })
}

exports.homeProduct = (req, res) => {
  // Make a get request to /api/users
  axios.get('http://localhost:3000/api/product')
    .then(function (response) {
      const admin = req.session.fullname
      if (admin === undefined) {
        res.redirect('/login')
      } else res.render('product', { product: response.data })
    })
    .catch(err => {
      res.send(err)
    })
}

exports.home = (req, res) => {
  // Make a get request to /api/users
  axios.get('http://localhost:3000/api/product')
    .then(function (response) {
      const user = req.session.fullname
      if (user === undefined) {
        res.render('index', { product: response.data })
      } else res.render('index2', { product: response.data, username: req.session.fullname, telephone: req.session.telephone, id: req.session._id, msg: req.flash('msg') })
    })
    .catch(err => {
      res.send(err)
    })
}

exports.order = (req, res) => {
  // Make a get request to /api/users
  axios.get('http://localhost:3000/api/order', { params: { id: req.query.id } })
    .then(function (response) {
      const user = req.session.fullname
      if (user === undefined) {
        res.render('index')
      } else res.render('order', { order: response.data, username: req.session.fullname, userid: req.session._id, id: req.query.id })
    })
    .catch(err => {
      res.send(err)
    })
}

exports.orderAdmin = (req, res) => {
  // Make a get request to /api/users
  axios.get('http://localhost:3000/api/orderAdmin', { params: { id: req.query.id } })
    .then(function (response) {
      const admin = req.session.fullname
      if (admin === undefined) {
        res.render('login')
      } else res.render('orderAdmin', { order: response.data, username: req.session.fullname, userid: req.session._id, id: req.query.id })
    })
    .catch(err => {
      res.send(err)
    })
}

exports.orderView = (req, res) => {
  // Make a get request to /api/users
  axios.get('http://localhost:3000/api/orderView', { params: { id: req.query.id } })
    .then(function (response) {
      const admin = req.session.fullname
      if (admin === undefined) {
        res.render('login')
      } else res.render('viewOrder', { order: response.data, username: req.session.fullname, userid: req.session._id, id: req.query.id })
    })
    .catch(err => {
      res.send(err)
    })
}

exports.update_user = (req, res) => {
  axios.get('http://localhost:3000/api/users', { params: { id: req.query.id } })
    .then(function (userdata) {
      res.render('update_user', { user: userdata.data, msg: req.flash('msg') })
    })
    .catch(err => {
      res.send(err)
    })
}

exports.update_product = (req, res) => {
  axios.get('http://localhost:3000/api/product', { params: { id: req.query.id } })
    .then(function (userdata) {
      res.render('update_product', { product: userdata.data, msg: req.flash('msg') })
    })
    .catch(err => {
      res.send(err)
    })
}
