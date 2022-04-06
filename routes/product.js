const router = require('express').Router()
const Product = require('../models/Product')
// Create
router.post('/new', async (req, res) => {
  const newProduct = new Product(req.body)
  try {
    await newProduct.save()
    res.redirect('/product')
  } catch (error) {
    res.status(500).json(error)
  }
})
module.exports = router
