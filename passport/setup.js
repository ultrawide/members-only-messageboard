const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");
const bcrypt = require("bcryptjs");

passport.serializeUser((user, done) => {
    done(null, user.id);
});
  
passport.deserializeUser(function(id, done) {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

// Setup LocalStrategy
passport.use(
  new LocalStrategy((username, password, done) => {
      User.findOne({ username: username }, (err, user) => {
          if (err) {
              return done(err);
          }
          if (!user) {
              return done(null, false, { msg: "Incorrect username" });
          }
          bcrypt.compare(password, user.password, (err, res) => {
              if (res) {
                // passwords match! log user in
                return done(null, user)
              } else {
                // passwords do not match!
                return done(null, false, {msg: "Incorrect password"})
              }
            })
      });
  })
);

module.exports = passport;
