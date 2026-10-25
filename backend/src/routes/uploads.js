import { Router } from 'express';
import multer from 'multer';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { requireAuth } from '../middleware/auth.js';

const router = Router();
const storage = multer.diskStorage({
  destination: path.resolve('uploads'),
  filename: (req, file, cb) => cb(null, `${randomUUID()}${path.extname(file.originalname).toLowerCase()}`)
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (['image/jpeg', 'image/png', 'image/webp'].includes(file.mimetype)) cb(null, true);
    else cb(new Error('Only JPG, PNG, and WEBP images are allowed.'));
  }
});
router.post('/image', requireAuth, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'Choose an image file.' });
  res.status(201).json({ url: `/uploads/${req.file.filename}`, filename: req.file.filename });
});
export default router;
