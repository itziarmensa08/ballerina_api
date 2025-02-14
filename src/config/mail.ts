import nodemailer from 'nodemailer';
import logger from './logger';

process.loadEnvFile();

// create reusable transporter object using the default SMTP transport
export const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.USER_EMAIL || "", // generated ethereal user
        pass: process.env.EMAIL_PASSWORD || "", // generated ethereal password
    },
    tls: {
        rejectUnauthorized: false,
    },
});

/**
 * Verify transporter connection
 */
transporter.verify((error, success) => {
    if (error) {
        logger.error('Error configuring email transporter:', error);
    } else {
        logger.info('Ready to send emails');
    }
});

/**
 * Send a validation email to the user
 * @param email - User's email
 * @param token - Validation token
 */
export const sendValidationEmail = async (email: string, token: string) => {
    const validationLink = `${process.env.FRONTEND_URL}/validate/${token}`;
    const mailOptions = {
        from: process.env.SMTP_FROM,
        to: email,
        subject: "Account Validation",
        html: `<p>Please validate your account by clicking the link below:</p>
                <a href="${validationLink}">Validate Account</a>`,
    };

    await transporter.sendMail(mailOptions);
};