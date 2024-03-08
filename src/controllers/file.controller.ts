import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { createOrUpdate } from '../services/TECUOLLib';
import Files from '../models/files.model';
import { allowedTypes } from '../routes/files.routes';
import { logError } from '../services/logging.service';

export const upload = async (req: Request, res: Response) => {
  try {
    const uploadedFile = req.file;

    if (!uploadedFile) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    if (uploadedFile.size > 10 * 1024 * 1024) {
      return res.status(400).json({ message: 'File size exceeds 10MB' });
    }

    if (!allowedTypes.includes(uploadedFile.mimetype)) {
      return res.status(400).json({ message: 'Invalid file type' });
    }

    const subdirectory = uploadedFile.mimetype.startsWith('image/') ? 'image' : 'doc';


    const fileData: any = {
      src: `${process.env.DOMAIN}/${subdirectory}/${uploadedFile.filename}`,
      name: uploadedFile.originalname,
      type: uploadedFile.mimetype,
      size: uploadedFile.size,
      ext: uploadedFile.mimetype.split('/')[1],
      tags: req.body.tags?.toString() || '',
    };

    const savedFile = await createOrUpdate({
      data: fileData,
      model: Files,
    });

    res.send({ ...savedFile })
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getImages = async (id_string: any) => {
  try {
    if (!id_string) {
      return null
    }
    id_string = id_string.split(",")
    return await Files.findAll({
      attributes: ['id', 'name', 'src'],
      where: {
        id: id_string
      },
    })
  } catch (error) {
    logError(error)
  }

}
