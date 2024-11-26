const nodemailer = require('nodemailer');
const emailConfig = require('../config/emailConfig');

const transporter = nodemailer.createTransport(emailConfig);

transporter.verify((error, success) => {
    if (error) {
        console.error("Error setting up the transporter: ", error);
    } else {
        console.log("Transporter is ready to send e-mails");
    }
});

const sendEmail = async (name, email, message) => {
    try {
        const mailOptions = {
            from: `"Contact Form" <${emailConfig.auth.user}>`,
            to: emailConfig.auth.user,
            subject: `New Contact Form Submission from ${name}`,
            text: `You received a message from ${name} (${email}):\n\n${message}`,
            html: `<p>You received a message from <strong>${name}</strong> (${email}):</p><p>${message}</p>`,
        };
        
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = { sendEmail }; 