import express, { Application } from 'express';
import logger from './config/logger';
import { dbConnect } from './config/mongo';
import router from './routes/routes';
import cors from 'cors';
import "./config/cloudinary"; 

process.loadEnvFile();

const app: Application = express();
app.use(express.json());

app.use(cors({ origin: process.env.ORIGIN }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));

dbConnect();

app.use("/api", router);