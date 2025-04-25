import sharp from 'sharp';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import { tmpdir } from 'os';
import { join } from 'path';
import { writeFile, unlink } from 'fs/promises';
import fs from 'fs';
import logger from '../config/logger';

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const MAX_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

const compressImage = async (buffer: Buffer): Promise<Buffer> => {
  return await sharp(buffer)
    .jpeg({ quality: 80 }) // O PNG/WebP si prefieres según el tipo original
    .toBuffer();
};

const compressVideo = async (buffer: Buffer): Promise<Buffer> => {
  const inputPath = join(tmpdir(), `input-${Date.now()}.mp4`);
  const outputPath = join(tmpdir(), `output-${Date.now()}.mp4`);

  await writeFile(inputPath, buffer);

  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .outputOptions([
        '-vcodec libx264',
        '-crf 32',
        '-preset veryfast',
        '-movflags +faststart',
      ])
      .on('end', async () => {
        const compressedBuffer = await fs.promises.readFile(outputPath);
        await unlink(inputPath);
        await unlink(outputPath);
        resolve(compressedBuffer);
      })
      .on('error', async (err) => {
        await unlink(inputPath).catch(() => {});
        reject(err);
      })
      .save(outputPath);
  });
};

export const maybeCompressFile = async (file: Express.Multer.File): Promise<Buffer> => {
  if (file.buffer.length <= MAX_SIZE_BYTES) return file.buffer;

  if (file.mimetype.startsWith('image/')) {
    try {
      const compressed = await compressImage(file.buffer);
      if (compressed.length < MAX_SIZE_BYTES) return compressed;
      throw new Error('Image still too large after compression');
    } catch (err) {
      logger.error('Error compressing image:', err);
      throw err;
    }
  }

  if (file.mimetype.startsWith('video/')) {
    try {
      const compressed = await compressVideo(file.buffer);
      if (compressed.length < MAX_SIZE_BYTES) return compressed;
      throw new Error('Video still too large after compression');
    } catch (err) {
      logger.error('Error compressing video:', err);
      throw err;
    }
  }

  return file.buffer; // Otro tipo de archivo
};
