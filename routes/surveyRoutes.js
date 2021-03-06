const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireLogin");
const recipientsConversion = require("../middlewares/recipientsConversion");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");
const _ = require("lodash");
const { Path } = require("path-parser");
const { URL } = require("url");
const Mailer = require("../services/Mailer");

const Survey = mongoose.model("surveys");

module.exports = (app) => {
  app.get("/api/surveys", requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).select({
      recipients: false,
    });

    res.send(surveys);
  });

  app.get("/api/surveys/:surveyId/:choice", (req, res) => {
    res.send("Thanks for responding!!");
  });

  app.post("/api/surveys/webhooks", (req, res) => {
    const p = new Path("/api/surveys/:surveyId/:choice");

    _.chain(req.body)
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname);

        if (match) {
          return {
            email: email,
            surveyId: match.surveyId,
            choice: match.choice,
          };
        }
      })
      .compact()
      .uniqBy("email", "surveyId")
      .each((event) => {
        Survey.updateOne(
          {
            _id: event.surveyId,
            recipients: {
              $elemMatch: {
                email: event.email,
                responded: false,
              },
            },
          },
          {
            $inc: { [event.choice]: 1 },
            $set: { "recipients.$.responded": true },
            lastResponded: new Date(),
          }
        ).exec();
      })
      .value();

    res.send({});
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
