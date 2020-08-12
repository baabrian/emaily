const express = require("express");
const passport = require("passport");
const GOOGLEKEY = require("./config/keys");
const keys = require("./config/keys");

const GoogleStrategy = require("passport-google-oauth20").Strategy;
const app = express();

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientId,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
    },
    (acccessToken, refreshToken, profile, done) => {
      console.log('access token: ' + acccessToken);
      console.log('refresh token: ' + refreshToken);
      console.log('profile: ' + JSON.stringify(profile, null, 1));
      console.log(profile.emails)
    }
  )
);

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

app.get("/auth/google/callback", passport.authenticate("google"));

const PORT = process.env.PORT || 5000;

app.listen(PORT);
