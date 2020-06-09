var express = require('express');
var router = express.Router();

/* Require controllers */
var user_controller = require("../controllers/userController");
var message_controller = require("../controllers/messageController");

/* GET home page. */
router.get('/', user_controller.index_get);

/// USER ROUTES ///

/* GET request for signing up with a new account. */
router.get("/sign-up", user_controller.sign_up_get);

/* POST sign-up page. */
router.post('/sign-up', user_controller.sign_up_post);

/* GET request to view membership status */
router.get("/membership", user_controller.membership_get);

/* POST request to update membership status */
router.post("/membership", user_controller.membership_post);

/* GET request for login page */
router.get("/login", user_controller.login_get);

/* POST request for login page */
router.post("/login", user_controller.login_post);

/* GET request for logout */
router.get("/logout", user_controller.logout_get);

/* GET request for creating a message */
router.get("/create-message", message_controller.create_message_get);

/* POST request for creating a message */
router.post("/create-message", message_controller.create_message_post);

module.exports = router;
