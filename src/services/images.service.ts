import mongoose from "mongoose";
import { Image } from "../interfaces/image.interface";
import { ImageModel } from "../models/image.model";
import { v2 as cloudinary } from "cloudinary";

/**
 * Get all images
 */
export const getAllImages = async (): Promise<Image[]> => {
  return await ImageModel.find();
};

/**
 * Get an image by ID
 * @param id - Image's ID
 */
export const getImageById = async (id: string): Promise<Image | null> => {
  if (!mongoose.isValidObjectId(id)) throw new Error("INVALID_ID");
  return await ImageModel.findById(id);
};

/**
 * Subir una imagen a Cloudinary
 */
const uploadToCloudinary = async (fileBuffer: Buffer): Promise<string> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream({ resource_type: "image", folder: "images" }, (error, result) => {
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

/**
 * Crear una nueva entrada de imagen en MongoDB después de subirla a Cloudinary
 */
export const createImage = async (key: string, file: Express.Multer.File): Promise<Image> => {
  if (!file) throw new Error("No se han recibido ninguna imágen");

  // Subir todas las imágenes a Cloudinary
  const uploadedImage = await uploadToCloudinary(file.buffer);

  // Guardar en MongoDB
  const newImage = new ImageModel({
    key,
    image: uploadedImage,
  });

  return await newImage.save();
};

/**
 * Update an image by ID
 * @param id - Image's ID
 * @param updateData - Data to update
 */
export const updateImageById = async (id: string, updateData: Partial<Image>): Promise<Image | null> => {
  if (!mongoose.isValidObjectId(id)) throw new Error("INVALID_ID");
  return await ImageModel.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
};

/**
 * Delete an image by ID
 * @param id - Image's ID
 */
export const deleteImageById = async (id: string): Promise<Image | null> => {
    if (!mongoose.isValidObjectId(id)) throw new Error("INVALID_ID");
    return await ImageModel.findByIdAndDelete(id);
};
