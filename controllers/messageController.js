var User = require('../models/user');
var Message = require('../models/message');

var async = require('async');
const bcrypt = require("bcryptjs");
const passport = require("passport");
const { body, validationResult } = require("express-validator");

/* GET create message */
exports.create_message_get = (req, res, next) => {
    res.render('create-message', {title: 'Create Message'});
}

/* POST create message */
exports.create_message_post = [
    body("message").not().isEmpty().trim().escape(),
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values/error messages.
            res.render('create-message', { title: 'Create Message', user: req.user, errors: errors.array()});
            return;
        }
        
        // Create and add message to database
        const message = new Message({ 
            user: req.user,
            message: req.body.message, 
            timestamp: Date.now()
        }).save(err => {
            if (err) {
                return next(err);
            };
            res.redirect("/");
        });
    }
]