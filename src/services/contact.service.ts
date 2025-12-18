import fs from 'fs';
import path from 'path';
import { transporter } from '../config/mail';

interface ContactData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const sendContactEmail = async (data: ContactData): Promise<void> => {
  const templatePath = path.join(__dirname, '..', 'config/templates', 'contact-template.html');
  let html = fs.readFileSync(templatePath, 'utf8');

  html = html
    .replace(/{{name}}/g, data.name)
    .replace(/{{email}}/g, data.email)
    .replace(/{{subject}}/g, data.subject)
    .replace(/{{message}}/g, data.message);

  await transporter.sendMail({
    from: `"Nou contacte" <${process.env.SMTP_FROM}>`,
    to: process.env.CONTACT_TO,
    bcc: process.env.ALERT_EMAIL,
    subject: `Nou contacte: ${data.subject}`,
    html
  });
}