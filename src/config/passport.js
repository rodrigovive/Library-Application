const passport = require('passport');
require('./strategies/local.strategy');

module.exports = function passportConfig(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  // store in session
  passport.serializeUser((user, done) => {
    done(null, user);
  });


  // retrieves user
  passport.deserializeUser((user, done) => {
    // find user
    done(null, user);
  });
};
