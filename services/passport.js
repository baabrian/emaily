const passport = require("passport");
const keys = require("../config/keys");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientId,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
    },
    (acccessToken, refreshToken, profile, done) => {
      console.log("access token: " + acccessToken);
      console.log("refresh token: " + refreshToken);
      console.log("profile: " + JSON.stringify(profile, null, 1));
    }
  )
);
