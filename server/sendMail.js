var nodemailer = require("nodemailer");
const dotenv = require("dotenv");

var fs = require("fs");

dotenv.config();

require.extensions[".html"] = function (module, filename) {
  module.exports = fs.readFileSync(filename, "utf8");
};

var html = require("./emails/recover password/recoverPassword.html");

const sendResetPass = (email, firstName, lastName, link, res) => {
  html = html.replace("@FirstName", firstName);
  html = html.replace("@LastName", lastName);
  html = html.replace("@Link", link);

  const transporter = nodemailer.createTransport("SMTP", {
    service: "gmail",
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: "projecthit2022@gmail.com", // sender address
    to: email, // list of receivers
    subject: "test mail", // Subject line
    html: html, // plain text body
    attachments: [
      {
        filename: "GIF_password.gif",
        path: "./emails/recover password/images/GIF_password.gif",
        cid: "GIF_password@kreata.ee",
      },
      {
        filename: "Logo.png",
        path: "./emails/recover password/images/Logo.png",
        cid: "Logo@kreata.ee",
      },
      {
        filename: "twitter2x.png",
        path: "./emails/recover password/images/twitter2x.png",
        cid: "twitter2x@kreata.ee",
      },
      {
        filename: "linkedin2x.png",
        path: "./emails/recover password/images/linkedin2x.png",
        cid: "linkedin2x@kreata.ee",
      },
      {
        filename: "instagram2x.png",
        path: "./emails/recover password/images/instagram2x.png",
        cid: "instagram2x@kreata.ee",
      },
      {
        filename: "facebook2x.png",
        path: "./emails/recover password/images/facebook2x.png",
        cid: "facebook2x@kreata.ee",
      },
    ],
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
};

module.exports = sendResetPass;
