const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireLogin");
const recipientsConversion = require("../middlewares/recipientsConversion");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");
const Mailer = require("../services/Mailer");

const Survey = mongoose.model("surveys");

module.exports = (app) => {
  app.get("/api/survey/thanks", (req, res) => {
    res.send("Thanks for responding!!");
  });

  app.post(
    "/api/survey",
    requireLogin,
    requireCredits,
    recipientsConversion,
    async (req, res) => {
      const { title, subject, body, recipients } = req.body;

      const survey = new Survey({
        title,
        body,
        subject,
        recipients,
        _user: req.user.id,
        dateSent: Date.now(),
      });

      //send email
      const mailer = new Mailer(survey, surveyTemplate(survey));

      try {
        await mailer.send();
        await survey.save();
        req.user.credits -= 1;
        const user = await req.user.save();
        res.send(user);
      } catch (e) {
        res.status(422).send(e);
      }
    }
  );
};
