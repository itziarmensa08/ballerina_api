import { Request, Response } from 'express';
import { sendTryEmail } from '../services/try.service';

export const sendTryMessage = async (req: Request, res: Response) => {
  try {
    const { name, email, age, doneRyth, message } = req.body;

    if (!name || !email || !age || !doneRyth) {
      res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    await sendTryEmail({ name, email, age, doneRyth, message });

    res.status(200).json({ message: 'Mensaje enviado correctamente.' });
  } catch (error) {
    console.error('Error enviando correo:', error);
    res.status(500).json({ error: 'Error interno al enviar el mensaje.' });
  }
};