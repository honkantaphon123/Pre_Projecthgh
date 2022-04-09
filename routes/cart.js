const router = require('express').Router()
const Product = require('../models/Product')

router.get('/add-to-cart/:id', (req, res) => {
  const slug = req.params.id
  let count
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
  count += 1
  console.log(count)
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
