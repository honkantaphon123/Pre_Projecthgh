const router = require('express').Router()
const Product = require('../models/Product')
const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (neq, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '_' + Date.now() + '_' + file.originalname)
  }
})
const upload = multer({
  storage: storage
}).single('image')

router.post('/new', upload, async (req, res) => {
  const newProduct = new Product({
    name: req.body.name,
    categories: req.body.categories,
    price: req.body.price,
    img: req.file.filename
  })
  try {
    await newProduct.save()
    res.redirect('/product')
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router
