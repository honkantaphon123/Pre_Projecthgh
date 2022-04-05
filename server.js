// Step 1 - set up express & mongoose
require('dotenv').config()
const User = require('./models/User2')
const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const flush = require('connect-flash')
const errorController = require('./controllers/errorController')
const authRouter = require('./routes/authRouter')
const morgan = require('morgan')
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
app.use(errorController)
app.use(cors())
app.use(morgan('tiny'))
app.use(cookieParser())
app.use(session({
  secret: 'secret',
  cookie: { maxAge: 60000 },
  resave: false,
  saveUninitialized: false
}))

// Set EJS as templating engine
app.set('views', './views')
app.set('view engine', 'ejs')

// กำหนด Path ของ EJS
app.get('/', (req, res) => {
  const aa = req.session.fullname
  if (aa) res.redirect('/index2')
  res.render('index')
})

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

app.get('/update-user', services.update_user)

app.get('/delete-user/:id', (req, res) => {
  const id = req.params.id
  console.log(id)
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
})

app.get('/admin', (services.homeRoutes))
app.get('/api/users', controller.find)

app.get('/index2', (req, res) => {
  const aa = req.session.fullname
  if (aa === undefined) {
    res.redirect('/login')
  } if (aa) {
    res.render('index2', { title: 'Express222', email: req.session.fullname })
  }
})

// เรียกใช้งาน Routes
// app.use('/api/auth', authRoute)
app.use('/auth/', authRouter)
// Step 9 - configure the server's port
app.listen(3000, () => console.log('Server Started'))

// Error handling
app.use((err, req, res, next) => {
  console.log('congrats you hit the error middleware')
  console.log(err)
})
