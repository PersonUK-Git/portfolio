const nodemailer = require('nodemailer');
require('dotenv').config();
async function sendEmail({ firstName, lastName, email, phoneNumber, topic, message }) {
  // Create a transporter using your email service
  let transporter = nodemailer.createTransport({
    service: 'gmail', // e.g., 'gmail'
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
  });

  // Set up email data
  let mailOptions = {
    from: email, // Sender address
    to: process.env.EMAIL_USER,
    subject: `New Contact Message from ${firstName} ${lastName}`, // Subject line
    text: `
      First Name: ${firstName}
      Last Name: ${lastName}
      Email: ${email}
      Phone Number: ${phoneNumber}
      Topic: ${topic}
      Message: ${message}
    `,
  };

  // Send email with defined transport object
  await transporter.sendMail(mailOptions);
}

module.exports = sendEmail;
