import { Router } from 'express';
import { sendContactMessage } from '../controllers/contact.controller';

const router = Router();

router.post('/', sendContactMessage);

export { router as routerContact};