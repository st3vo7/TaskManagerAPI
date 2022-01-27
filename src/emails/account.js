const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "stefanzm@gmail.com",
    subject: "Thanks for joining in!",
    text: `Welcome to the app, ${name}. Let me know how can I help you.`,
  });
};

const sendGoodbyeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "stefanzm@gmail.com",
    subject: "Leaving already?",
    text: `Goodbye ${name}. It was nice having you here. Let me know what could we do better.`,
  });
};

module.exports = {
  sendWelcomeEmail,
  sendGoodbyeEmail,
};
