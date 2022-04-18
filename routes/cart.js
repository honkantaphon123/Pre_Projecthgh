const router = require('express').Router()
const Product = require('../models/Product')
const Order = require('../models/Order')
const User = require('../models/User2')

router.get('/add-to-cart/:id', (req, res) => {
  const slug = req.params.id
  Product.findOne({ _id: slug }, function (err, p) {
    if (err) console.log(err)
    if (typeof req.session.cart === 'undefined') {
      req.session.cart = []
      req.session.cart.push({
        title: p.name,
        qty: 1,
        price: p.price,
        image: p.img
      })
    } else {
      const cart = req.session.cart
      let newItem = true
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].title === p.name) {
          cart[i].qty++

          newItem = false
          break
        }
      }
      if (newItem) {
        cart.push({
          title: p.name,
          qty: 1,
          price: p.price,
          image: p.img
        })
      }
    }
    console.log(req.session.cart)
    res.redirect('back')
  })
})

router.get('/checkout', function (req, res) {
  User.findOne({ fullname: req.session.fullname }, function (err, p) {
    if (err) console.log(err)
    else {
      res.render('checkout', {
        title: 'Checkout',
        cart: req.session.cart,
        username: req.session.fullname,
        telephone: p.telephone,
        msg: req.flash('msg')
      })
    }
  })
})

router.get('/update/:product', function (req, res) {
  const slug = req.params.product
  const cart = req.session.cart
  const action = req.query.action
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].title === slug) {
      switch (action) {
        case 'add':
          cart[i].qty++
          break
        case 'remove':
          if (cart[i].qty > 1) { cart[i].qty-- }
          break
        case 'clear':
          cart.splice(i, 1)
          if (cart.length === 0) delete req.session.cart
          break
        default:
          console.log('update')
          break
      }
      break
    }
  }
  res.redirect('back')
})

router.get('/clear', function (req, res) {
  delete req.session.cart
  res.redirect('back')
})

router.get('/order/:id', function (req, res) {
  res.render('order', {
    cart: req.session.cart,
    username: req.session.fullname,
    msg: req.flash('msg')
  })
})

router.post('/submit', function (req, res, next) {
  try {
    const order = new Order({
      username: req.session.fullname,
      telephone: req.body.telephone,
      price: req.body.price,
      total: req.body.total,
      orderlist: req.body.orderlist,
      qty: req.body.qty2,
      cart: req.body.cart

    })
    order.save()
    delete req.session.cart
  } catch (err) {
    next(err)
    res.redirect('/checkout')
  }
  res.redirect('/index2')
})

module.exports = router
