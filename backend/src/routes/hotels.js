import { Router } from 'express';
import Hotel from '../models/Hotel.js';

const router = Router();
router.get('/cities', async (req, res, next) => {
  try {
    const cities = await Hotel.distinct('city');
    res.json(cities.sort());
  } catch (err) { next(err); }
});
router.get('/', async (req, res, next) => {
  try {
    console.log('Database:', Hotel.db.name);
    const filter = {};
    if (req.query.city) filter.city = new RegExp(`^${String(req.query.city).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i');
    if (req.query.q) filter.name = new RegExp(String(req.query.q).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    const hotels = await Hotel.find(filter).sort({ city: 1, name: 1 }).lean();
    console.log('Hotels found:', hotels.length);
    res.json(hotels);
  } catch (err) { next(err); }
});
router.get('/:id', async (req, res, next) => {
  try {
    
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) return res.status(404).json({ message: 'Hotel not found.' });
    res.json(hotel);
  } catch (err) { next(err); }
});
export default router;
