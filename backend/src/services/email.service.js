const nodemailer = require("nodemailer");
const emailConfig = require("../config/email.config.js");

// Crea un objeto de transporte de nodemailer con la configuración de correo
const transporter = nodemailer.createTransport(emailConfig);

/**
 * Envia un correo electronico
 * @param {string} to - Dirección de correo del destinatario
 * @param {string} subject - Asunto del correo
 * @param {string} text - Cuerpo del correo en formato de texto
 * @returns {Promise}
 */
const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: emailConfig.auth.user,
    to,
    subject,
    text,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = {
  sendEmail,
};