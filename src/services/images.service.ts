import mongoose from "mongoose";
import { Image } from "../interfaces/image.interface";
import { ImageModel } from "../models/image.model";
import { v2 as cloudinary } from "cloudinary";
import { uploadToCloudinary } from "../config/cloudinary";
import { maybeCompressFile } from "../utils/compress.utils";

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
 * Get an image by key
 * @param key - Image's Key
 */
export const getImageByKey = async (key: string): Promise<String | null> => {
  let image: Image | null = await ImageModel.findOne({ key });
  if (!image) return null;
  return image.image;
};

/**
 * Crear una nueva entrada de imagen en MongoDB después de subirla a Cloudinary
 */
export const createImage = async (key: string, file: Express.Multer.File): Promise<Image> => {
  if (!file) throw new Error("No se han recibido ninguna imágen");

  const compressedBuffer = await maybeCompressFile(file);

  // Subir todas las imágenes a Cloudinary
  const uploadedImage = await uploadToCloudinary(compressedBuffer, 'images');

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
export const updateImageById = async (id: string, file: Express.Multer.File): Promise<Image | null> => {
  if (!mongoose.isValidObjectId(id)) throw new Error("INVALID_ID");
  if (!file) throw new Error("No se han recibido ninguna imágen");

  const compressedBuffer = await maybeCompressFile(file);

  // Subir todas las imágenes a Cloudinary
  const uploadedImage = await uploadToCloudinary(compressedBuffer, 'images');
  
  return await ImageModel.findByIdAndUpdate(id, {image: uploadedImage}, { new: true, runValidators: true });
};

/**
 * Delete an image by ID
 * @param id - Image's ID
 */
export const deleteImageById = async (id: string): Promise<Image | null> => {
    if (!mongoose.isValidObjectId(id)) throw new Error("INVALID_ID");
    return await ImageModel.findByIdAndDelete(id);
};
