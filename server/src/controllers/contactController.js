require("dotenv").config();
const { EMAIL_USER, EMAIL_PASS, EMAIL_HOST } = process.env;
const nodemailer = require('nodemailer');

const sendContactEmail = async ({ fullname, email, message }) => {
  const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: 465,
    secure: true,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS, // Usa la contraseña de aplicación generada aquí
    },
  });

  try {
    await transporter.sendMail({
      from: `"${fullname}" <${email}>`, // Formato más profesional
      to: EMAIL_USER,
      subject: `Nuevo mensaje de ${fullname}`,
      text: message,
      html: `<p>${message}</p>`, // Versión HTML opcional
    });
    console.log('Correo enviado con éxito');
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    throw error;
  }
};

module.exports = {
  sendContactEmail,
};