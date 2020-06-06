var User = require('../models/user');

var async = require('async');
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

/* GET sign-up page */
exports.sign_up_get = (req, res, next) => {
    res.render('sign-up', { title: 'Sign-up' });
}

/* POST sign-up page */
exports.sign_up_post = [
    /* Sanitize and validate inputs */
    /* Todo: Improve loose sanitization and user friendly errors */

    body("username").isEmail().normalizeEmail(),
    body("password").isLength({min: 5}),    
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
    res.render('membership', { title: 'Membership' });
}
