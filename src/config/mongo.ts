import { connect } from "mongoose";
import logger from "./logger";

export async function dbConnect(): Promise<void> {

    const DB_URI = process.env.DB_URI;

    if (!DB_URI) {
        logger.error("DB_URI is not defined");
        process.exit(1);
    }

    connect(DB_URI)
    .then(() => {
        logger.info("Connected to MongoDB");
    })
    .catch(err => {
        logger.error('Connection Error:', err);
        setTimeout(dbConnect, 5000);
    });

}