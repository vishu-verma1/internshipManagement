const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
  // console.log(to, subject, text, process.env.EMAIL_USER, process.env.EMAIL_PASS )
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,

    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Internship System" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
  });
};

module.exports = sendEmail;
