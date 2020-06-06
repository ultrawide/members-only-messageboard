var express = require('express');
var router = express.Router();

/* Require controllers */
var user_controller = require("../controllers/userController");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/// USER ROUTES ///

/* GET request for signing up with a new account. */
router.get("/sign-up", user_controller.sign_up_get);

/* POST sign-up page. */
router.post('/sign-up', user_controller.sign_up_post);

module.exports = router;
