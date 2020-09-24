//keys.js - figure out what set of credentials to return

if (process.env.NODE_ENV === "production") {
  //return prod set of keys
  return module.exports = require("./prod");
} else {
  //return set of dev keys
  return module.exports = require("./dev");
}
