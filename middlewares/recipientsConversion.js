module.exports = (req, res, next) => {
  const { recipients } = req.body;

  req.body.recipients = recipients.split(",").map((email) => ({
    email: email.trim(),
  }));

  next();
};
