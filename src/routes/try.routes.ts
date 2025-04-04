import { Router } from 'express';
import { sendTryMessage } from '../controllers/try.controller';

const router = Router();

router.post('/', sendTryMessage);

export { router as routerTry};