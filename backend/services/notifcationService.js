const nodemailer = require("nodemailer");

exports.sendNotification = async (email, internshipTitle) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "New Internship Opportunity",
    text: `You are eligible for a new internship: ${internshipTitle}. Check it out now!`,
  });
};
