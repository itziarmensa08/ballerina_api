import { v2 as cloudinary } from "cloudinary";
import logger from "./logger";

process.loadEnvFile();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

logger.info("Cloudinary configurado con éxito:", {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY ? "OK" : "MISSING",
  api_secret: process.env.CLOUDINARY_API_SECRET ? "OK" : "MISSING",
});

export default cloudinary;

/**
 * Subir una imagen a Cloudinary
 */
export const uploadToCloudinary = async (fileBuffer: Buffer, folder: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream({ resource_type: "auto", folder: folder }, (error, result) => {
      if (error) {
        console.error("Error subiendo a Cloudinary:", error);
        return reject(error);
      }
      if (result?.secure_url) {
        return resolve(result.secure_url);
      } else {
        return reject("No se recibió una URL de Cloudinary");
      }
    }).end(fileBuffer);
  });
};