const express = require("express");
require("./models");
const authRoutes = require("./routes/authRoutes");
const billingRoutes = require("./routes/billingRoutes");
const surveyRoutes = require("./routes/surveyRoutes");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { TOTALDAYS, ONEDAY, ONEHOUR, ONEMINUTE, MILISEC } = require("./globals");
require("./services/passport");

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const app = express();

app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: TOTALDAYS * ONEDAY * ONEHOUR * ONEMINUTE * MILISEC,
    keys: [keys.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);
billingRoutes(app);
surveyRoutes(app);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT);
