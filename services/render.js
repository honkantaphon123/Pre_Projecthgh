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

exports.update_user = (req, res) => {
  axios.get('http://localhost:3000/api/users', { params: { id: req.query.id } })
    .then(function (userdata) {
      res.render('update_user', { user: userdata.data, msg: req.flash('msg') })
    })
    .catch(err => {
      res.send(err)
    })
}
