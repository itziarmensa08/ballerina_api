import Transport from 'winston-transport';
import { transporter } from '../config/mail';


interface EmailTransportOptions {
  level: 'warn' | 'error';
}

export class EmailTransport extends Transport {
  constructor(opts: EmailTransportOptions) {
    super(opts);
  }

  async log(info: any, callback: () => void) {
    setImmediate(() => this.emit('logged', info));

    const { level, message, timestamp, stack } = info;

    try {
      await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: process.env.ALERT_EMAIL,
        subject: `⚠️ ${level.toUpperCase()} en producción`,
        html: `
          <h3>Nivel: ${level}</h3>
          <p><strong>Fecha:</strong> ${timestamp}</p>
          <p><strong>Mensaje:</strong></p>
          <pre>${message}</pre>
          ${stack ? `<pre>${stack}</pre>` : ''}
        `,
      });
    } catch (err) {
      console.error('Error sending log email', err);
    }

    callback();
  }
}