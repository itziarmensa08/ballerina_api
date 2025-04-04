import fs from 'fs';
import path from 'path';
import { transporter } from '../config/mail';

interface TryData {
  name: string;
  email: string;
  doneRyth: string;
  age: string;
  message: string;
}

export const sendTryEmail = async (data: TryData): Promise<void> => {
  const templatePath = path.join(__dirname, '..', 'config/templates', 'try-template.html');
  let html = fs.readFileSync(templatePath, 'utf8');

  var doneRyth = 'No'; 
  if (data.doneRyth == 'yes') {
    doneRyth = 'Sí';
  }

  let messageRow = '';
  if (data.message && data.message.trim() !== '') {
    messageRow = `
    <tr>
      <td align="left" class="a" style="padding:0;Margin:0">
        <p class="b" style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;
        line-height:24px;letter-spacing:0;color:#333333;font-size:16px">
          <strong>Missatge:</strong>
        </p>
        <p class="b" style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;
        line-height:24px;letter-spacing:0;color:#333333;font-size:16px">
          ${data.message}
        </p>
      </td>
    </tr>`;
  }

  html = html
    .replace(/{{name}}/g, data.name)
    .replace(/{{email}}/g, data.email)
    .replace(/{{doneRyth}}/g, doneRyth)
    .replace(/{{age}}/g, data.age)
    .replace(/{{messageRow}}/g, messageRow);

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: process.env.CONTACT_TO,
    subject: `Nova prova`,
    html
  });
}