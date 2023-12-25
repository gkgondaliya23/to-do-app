const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../model/user.model");

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      let user = await User.findOne({ email: email });

      if (!user) {
        return done(null, false, { message: "Incorrect email." });
      }
      user.authenticate(password, (authErr, isAuthenticated) => {
        if (authErr) {
          return done(authErr);
        }
        if (!isAuthenticated) {
          return done(null, false, { message: "Incorrect password." });
        }
        return done(null, user);
      });
    }
  )
);

// serialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// deserialize user
passport.deserializeUser(async(id, done) => {
  let user = await User.findById(id);
  done(null, user);
});
