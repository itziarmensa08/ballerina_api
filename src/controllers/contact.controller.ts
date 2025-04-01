import { Request, Response } from 'express';
import { sendContactEmail } from '../services/contact.service';

export const sendContactMessage = async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    await sendContactEmail({ name, email, subject, message });

    res.status(200).json({ message: 'Mensaje enviado correctamente.' });
  } catch (error) {
    console.error('Error enviando correo:', error);
    res.status(500).json({ error: 'Error interno al enviar el mensaje.' });
  }
};