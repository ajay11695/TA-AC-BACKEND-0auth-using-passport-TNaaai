var express = require('express');
var passport = require('passport');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // console.log(req.user,req.session)
  res.render('index', { title: 'Express' });
});

// successful login
router.get('/success', function(req, res, next) {
  res.render('success');
});

// failure login
router.get('/failure', function(req, res, next) {
  res.render('failure');
});

// login using github
router.get('/auth/github',
  passport.authenticate('github'));

router.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/failure' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/success');
  });


// login using google
router.get('/auth/google',
  passport.authenticate('google',{ scope:
    [ 'email', 'profile' ] }
    ));

router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/failure' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/success');
  });


//   router.post('/login',
//   passport.authenticate('local', { failureRedirect: '/users/login', successRedirect: '/success', failureFlash: true })
// );

  // logout
  router.get('/logout',(req,res)=>{
    req.session.destroy()
    res.redirect('/')
  })

module.exports = router;
