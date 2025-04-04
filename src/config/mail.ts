import nodemailer from 'nodemailer';
import logger from './logger';
import path from 'path';
import fs from 'fs';

process.loadEnvFile();

// create reusable transporter object using the default SMTP transport
export const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.USER_EMAIL || "", // generated ethereal user
        pass: process.env.EMAIL_PASSWORD || "", // generated ethereal password
    }
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
    const validationLink = `${process.env.ORIGIN}/validate/${token}`;
    const templatePath = path.join(__dirname, '..', 'config/templates', 'confirm-template.html');
    let html = fs.readFileSync(templatePath, 'utf8');

    html = html
        .replace(/{{validationLink}}/g, validationLink);

    await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: email,
        subject: `Validació del compte`,
        html
    });
};