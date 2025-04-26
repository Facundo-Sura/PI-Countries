require ("dotenv").config();
const { EMAIL_USER, EMAIL_PASS } = process.env;
const nodemailer = require('nodemailer');

const sendContactEmail = async ({ fullname, email, message }) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL_USER, // Tu correo
      pass: EMAIL_PASS, // Contraseña de aplicación
    },
  });

  await transporter.sendMail({
    from: email,
    to: process.env.EMAIL_USER,
    subject: `Nuevo mensaje de ${fullname}`,
    text: message,
  });
};

module.exports = {
  sendContactEmail,
};
