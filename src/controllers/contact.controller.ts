import { Request, Response } from 'express';
import { sendContactEmail } from '../services/contact.service';
import logger from '../config/logger';

export const sendContactMessage = async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      logger.error(`Error sendContactMessage: Todos los campos son obligatorios.`)
      res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    await sendContactEmail({ name, email, subject, message });
    logger.warn(`Contact message sent successfully from: ${email}`);
    res.status(200).json({ message: 'Mensaje enviado correctamente.' });
  } catch (error) {
    logger.error(`Error sendContactMessage: ${error}`)
    res.status(500).json({ error: 'Error interno al enviar el mensaje.' });
  }
};