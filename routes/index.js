var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET sign-up page. */
router.get('/sign-up', function(req, res, next) {
  res.render('sign-up', {title: 'Sign-up' });
});

/* POST sign-up page. */
router.post('/sign-up', function(req, res, next) {
  res.render('sign-up', {title: 'Sign-up' });
});


module.exports = router;
