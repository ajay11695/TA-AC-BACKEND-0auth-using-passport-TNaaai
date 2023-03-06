var express = require('express');
var passport = require('passport');
var User = require('../model/User')

var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// registration
router.get('/register', function (req, res, next) {
  var error = req.flash('error')[0]
  res.render('register', { error });
});


router.post('/register', function (req, res, next) {
  console.log(req.body, 'r')
  User.create(req.body)
    .then(() => {
      return res.redirect('/users/login')
    })
    .catch((err) => {
      if (err) {

        if (err.name === 'MongoServerError') {
          req.flash('error', 'This email is taken')
          return res.redirect('/users/register')
        }
        if (err.name === 'ValidationError') {
          req.flash('error', err.message)
          return res.redirect('/users/register')
        }

      }
    })

});

// login
router.get('/login', function (req, res, next) {
  var error = req.flash('error')[0]
  console.log(error,'back-login');
  res.render('login', { error });
});


router.post('/login',
  passport.authenticate('local', { failureRedirect: '/users/login', successRedirect: '/success', failureFlash: true })
);

module.exports = router;
