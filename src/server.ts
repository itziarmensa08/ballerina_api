import express, { Application } from 'express';
import logger from './config/logger';
import { dbConnect } from './config/mongo';

process.loadEnvFile();

const app: Application = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));

dbConnect();