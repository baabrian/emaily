const express = require("express");
const authRoutes = require("./routes/authRoutes");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
const mongoose = require("mongoose");
const { TOTALDAYS, ONEDAY, ONEHOUR, ONEMINUTE, MILISEC } = require("./globals");
require("./models/User");
require("./services/passport");

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const app = express();

app.use(
  cookieSession({
    maxAge: TOTALDAYS * ONEDAY * ONEHOUR * ONEMINUTE * MILISEC,
    keys: [keys.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT);
