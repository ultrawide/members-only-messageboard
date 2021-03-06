var User = require('../models/user');
var Message = require('../models/message');

var async = require('async');
const bcrypt = require("bcryptjs");
const passport = require("passport");
const { body, validationResult } = require("express-validator");

exports.index_get = (req, res, next) => {
    // Retrieve all messages and display
    Message.find()
    .populate('user')
    // .sort([['timestamp', 'ascending']]) // Azure Cosmos DB does not support sorting on non-indexed fields
    .exec(function (err, list_messages) {
        if(err) { return next(err); }
        // Successful, so render
        res.render('index', { title: 'Messageboard', user: req.user, messages: list_messages});
    });
}

/* GET sign-up page */
exports.sign_up_get = (req, res, next) => {
    res.render('sign-up', { title: 'Sign-up' });
}

/* POST sign-up page */
exports.sign_up_post = [
    /* Sanitize and validate inputs */
    /* Todo: Improve loose sanitization and user friendly errors */

    body("username").isEmail().normalizeEmail().escape(),
    body("password").isLength({min: 5}).escape(),    
    body("confirm_password").custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password');
        }
        // Indicates the success of this synchronous customer validator
        return true;
    }),
    body("firstname").not().isEmpty().trim().escape(),
    body("lastname").not().isEmpty().trim().escape(),
    
    /* Handle the post request */
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values/error messages.
            res.render('sign-up', { title: 'Sign-up', errors: errors.array()});
            return;
        }

        bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
            if (err) {
                return next(err);
            }
            // otherwise, store hashedPassword in DB
            const user = new User({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                username: req.body.username,
                password: hashedPassword,
                memberstatus: "Non-Member",
                messages: []
            }).save(err => {
                if (err) {
                    return next(err);
                }
                res.redirect("/");
            });
        });
    }
]

/* GET membership page */
exports.membership_get = (req, res, next) => {
    res.render('membership', { title: 'Membership', user: req.user });
}

/* POST membership page */
exports.membership_post = [
    body("passcode").not().isEmpty().trim().escape(),
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values/error messages.
            res.render('membership', { title: 'Membership', user: req.user, errors: errors.array()});
            return;
        }
        
        if (req.body.passcode === "Life is great!") {
            User.findByIdAndUpdate( 
                {_id: req.user.id}, 
                {"memberstatus":"Member"},
                (err, result) => {
                    if (err) {
                        res.send(err);
                    } else {
                        res.redirect("/");
                    }
                }
            );
        } else if (req.body.passcode === "Life is amazing!")  {
            User.findByIdAndUpdate( 
                {_id: req.user.id}, 
                {"admin":true},
                (err, result) => {
                    if (err) {
                        res.send(err);
                    } else {
                        res.redirect("/");
                    }
                }
            );
        } else {
            var err = new Error('Incorrect passcode');
            return next(err);
        }
    }
]

/* GET login page */
exports.login_get = (req, res, next) => {
    res.render('login', { title: 'Login' });
}

/* POST login page */
exports.login_post = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
}); 

/* GET logout */
exports.logout_get = (req, res) => {
    req.logout();
    res.redirect("/");
}
