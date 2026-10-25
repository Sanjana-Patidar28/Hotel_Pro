import 'dotenv/config';
console.log('Mongo URI database:', new URL(process.env.MONGODB_URI).pathname);
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'node:path';
import fs from 'node:fs';
import authRoutes from './routes/auth.js';
import hotelRoutes from './routes/hotels.js';
import bookingRoutes from './routes/bookings.js';
import uploadRoutes from './routes/uploads.js';

const app = express();
const PORT = process.env.PORT || 5000;
if (!process.env.JWT_SECRET || process.env.JWT_SECRET === 'replace_this_with_a_long_random_secret') {
  console.warn('WARNING: Set a strong, private JWT_SECRET in backend/.env before using this beyond local testing.');
}
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174'
  ]
}));
app.use(express.json({ limit: '1mb' }));
fs.mkdirSync(path.resolve('uploads'), { recursive: true });
app.use('/uploads', express.static(path.resolve('uploads')));

app.get('/api/health', (req, res) => res.json({ status: 'ok', app: 'Hotel_Pro API' }));
app.use('/api/auth', authRoutes);
app.use('/api/hotels', hotelRoutes);
app.get('/api/cities', async (req, res, next) => {
  try {
    const Hotel = (await import('./models/Hotel.js')).default;
    res.json((await Hotel.distinct('city')).sort());
  } catch (err) { next(err); }
});
app.use('/api/bookings', bookingRoutes);
app.use('/api/uploads', uploadRoutes);
app.use((err, req, res, next) => {
  console.error(err);
  if (err.name === 'ValidationError') return res.status(400).json({ message: err.message });
  if (err.name === 'CastError') return res.status(400).json({ message: 'Invalid ID format.' });
  if (err.code === 11000) return res.status(409).json({ message: 'That record already exists.' });
  res.status(err.status || 500).json({ message: err.message || 'Server error.' });
});

if (!process.env.MONGODB_URI) {
  console.error('MONGODB_URI is missing. Add it to backend/.env.');
  process.exit(1);
}
try {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Hotel_Pro API running at http://localhost:${PORT}`));
} catch (err) {
  console.error('MongoDB connection failed:', err.message);
  process.exit(1);
}
