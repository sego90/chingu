var express = require('express');
var router = express.Router();

/*  Checks if the user is authenticated,
    it can be used to redirect to /login unauthenticated
    access to certain routes. */
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login');
  }
}

/*  Send the req.user to the view as user variable.
    Even if the user is undefined (this can be used to
    show or hide data depending if there is a user
    present or not). */
router.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});

/* GET home page. */
router.get('/', isLoggedIn, function (req, res, next) {
  res.render('dash', {
    title: 'Chingu PP'
  });
});

/* Landing Page! (where users log in via slack) */
router.get('/login', function (req, res) {
  res.render('login', {
    title: 'Chingu PP'
  });
});

/* Logs user out */
router.get('/logout', isLoggedIn, function (req, res) {
  req.logout();
  res.redirect('/');
});

/* GET, POST and DELETE are in ./request-match */
router.use('/request-match', isLoggedIn, require('./request-match'));

/* Handle slack OAuth process */
router.use('/auth', require('./auth'));

module.exports = router;
