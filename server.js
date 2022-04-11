// Step 1 - set up express & mongoose
require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const flush = require('connect-flash')
const errorController = require('./controllers/errorController')
const authRouter = require('./routes/authRouter')
const productRouter = require('./routes/product')
const cartRouter = require('./routes/cart')
// const morgan = require('morgan')
const cors = require('cors')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const services = require('./services/render')
const controller = require('./controllers/controllers')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(flush())
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))
app.use(express.static('public'))
app.use(express.static('uploads'))
app.use(errorController)
app.use(cors())
// app.use(morgan('tiny'))
app.use(cookieParser())
app.use(session({
  secret: 'secret',
  maxAge: 600000,
  resave: false,
  saveUninitialized: false
}))

// Set EJS as templating engine
app.set('views', './views')
app.set('view engine', 'ejs')

app.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/login')
})

app.get('/login', (req, res) => {
  res.render('login', { msg: req.flash('msg') })
})

app.get('/register', (req, res) => {
  res.render('register', { msg: req.flash('msg') })
})

app.get('/add-user', (req, res) => {
  res.render('add_user', { msg: req.flash('msg') })
})

app.get('/add-product', (req, res) => {
  res.render('add_product', { msg: req.flash('msg') })
})

app.get('/add-to-cart/:id', cartRouter)
app.get('/checkout', cartRouter)
app.get('/order', (services.order))
app.get('/orderAdmin', (services.orderAdmin))
app.get('/update/:product', cartRouter)
app.get('/clear', cartRouter)
app.post('/submit', cartRouter)
app.get('/update-user', services.update_user)
app.get('/update-product', services.update_product)
app.get('/delete-user/:id', controller.delete)
app.get('/delete-product/:id', controller.deleteProduct)
app.get('/admin', (services.homeRoutes))
app.get('/product', (services.homeProduct))
app.get('/', (services.home))
app.get('/index2', (services.home))
app.get('/api/users', controller.find)
app.get('/api/product', controller.findProduct)
app.get('/api/order', controller.findOrder)
app.get('/api/orderAdmin', controller.findOrderAdmin)
app.get('/api/orderView', controller.viewOrder)
app.get('/viewOrder', (services.orderView))

// เรียกใช้งาน Routes
app.use('/auth/', authRouter)
app.use('/auth/product', productRouter)

// Step 9 - configure the server's port
app.listen(3000, () => console.log('Server Started'))

// Error handling
app.use((err, req, res, next) => {
  console.log('congrats you hit the error middleware')
  console.log(err)
})
