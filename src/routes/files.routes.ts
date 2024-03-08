import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { upload } from '../controllers/file.controller';

const storage = multer.diskStorage({
  destination: (req: Express.Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void) => {
    const subdirectory = file.mimetype.startsWith('image/') ? 'image' : 'doc';
    const destination = path.join(__dirname, '..', '..', 'src', 'public', subdirectory);
    if (!fs.existsSync(destination)) {
      fs.mkdirSync(destination);
    }
    cb(null, destination);
  },
  filename: (req: Express.Request, file: any, cb: (error: any, filename: string) => void) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
  },
});

const uploadDoc = multer({ storage: storage });

const FileRouts = Router();

FileRouts.post('/upload', uploadDoc.single('file'), upload);

export default FileRouts;

export const allowedTypes = [
  'image/png',
  'image/jpg',
  'image/jpeg',
  'application/pdf',
  'application/msword',
  'application/vnd.ms-excel',
  'application/vnd.ms-powerpoint',
];
