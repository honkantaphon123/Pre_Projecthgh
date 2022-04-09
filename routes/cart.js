const router = require('express').Router()
const Product = require('../models/Product')

router.get('/add-to-cart/:id', (req, res) => {
  const slug = req.params.id
  Product.findOne({ name: slug }, function (err, p) {
    if (err) { console.log(err) }
    if (typeof req.session.cart === 'undefined') {
      req.session.cart = []
      req.session.cart.push({
        title: slug,
        qty: 1,
        price: parseFloat(p.price),
        image: p.img
      })
    } else {
      const cart = req.session.cart
      let newItem = true
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].title === slug) {
          cart[i].qty++
          newItem = false
          break
        }
      }
      if (newItem) {
        cart.push({
          title: slug,
          qty: 1,
          price: parseFloat(p.price),
          image: p.img
        })
      }
    }
    console.log(req.session.cart)
    res.redirect('back')
  })
})

router.get('/checkout', function (req, res) {
  res.render('checkout', {
    title: 'Checkout',
    cart: req.session.cart,
    username: req.session.fullname,
    msg: req.flash('msg')
  })
})
module.exports = router
