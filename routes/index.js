var express = require('express');
var router = express.Router();

/* Require controllers */
var user_controller = require("../controllers/userController");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Members Only Messageboard', user: req.user});
});

/// USER ROUTES ///

/* GET request for signing up with a new account. */
router.get("/sign-up", user_controller.sign_up_get);

/* POST sign-up page. */
router.post('/sign-up', user_controller.sign_up_post);

/* GET request to view membership status */
router.get("/membership", user_controller.membership_get);

/* GET request for login page */
router.get("/login", user_controller.login_get);

/* POST request for login page */
router.post("/login", user_controller.login_post);

module.exports = router;
