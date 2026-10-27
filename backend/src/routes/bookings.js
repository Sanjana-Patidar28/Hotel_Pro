import { Router } from 'express';
import mongoose from 'mongoose';
import Booking from '../models/Booking.js';
import Hotel from '../models/Hotel.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();
router.use(requireAuth);

router.post('/', async (req, res, next) => {
  try {
    console.log('Booking request body:', req.body);
    const { hotelId, roomId, checkIn, checkOut, guests = 1 } = req.body;
    if (!mongoose.isValidObjectId(hotelId) || !mongoose.isValidObjectId(roomId)) return res.status(400).json({ message: 'Please choose a valid hotel and room.' });
    const start = new Date(checkIn), end = new Date(checkOut);
    const today = new Date(); today.setHours(0, 0, 0, 0);
    if (!checkIn || !checkOut || Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || start < today || end <= start) {
      return res.status(400).json({ message: 'Choose valid dates. Check-out must be after check-in.' });
    }
    if (!Number.isInteger(Number(guests)) || Number(guests) < 1 || Number(guests) > 12) return res.status(400).json({ message: 'Guests must be between 1 and 12.' });
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) return res.status(404).json({ message: 'Hotel not found.' });
    const room = hotel.rooms.id(roomId);
    if (!room) return res.status(404).json({ message: 'Room type not found.' });
    if (Number(guests) > room.capacity) return res.status(400).json({ message: `This room accommodates up to ${room.capacity} guests.` });
    const overlapping = await Booking.countDocuments({
      hotel: hotel._id, roomId: room._id, status: 'Confirmed',
      checkIn: { $lt: end }, checkOut: { $gt: start }
    });
    if (overlapping >= room.totalRooms) return res.status(409).json({ message: 'No rooms of this type are available for those dates.' });
    const nights = Math.ceil((end - start) / 86400000);
    const booking = await Booking.create({
      user: req.user.id, hotel: hotel._id, roomId: room._id, roomType: room.type,
      city: hotel.city, checkIn: start, checkOut: end, guests: Number(guests),
      totalPrice: nights * room.pricePerNight, status: 'Confirmed'
    });
    res.status(201).json(await Booking.findById(booking._id).populate('hotel', 'name city address'));
  } catch (err) { next(err); }
});

router.get('/mine', async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
  .populate('hotel', 'name city address imageUrl')
  .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) { next(err); }
});

router.patch('/:id/cancel', async (req, res, next) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id, user: req.user.id });
    if (!booking) return res.status(404).json({ message: 'Booking not found.' });
    if (booking.status === 'Cancelled') return res.status(400).json({ message: 'This booking is already cancelled.' });
    booking.status = 'Cancelled';
    await booking.save();
    res.json({ message: 'Booking cancelled.', booking });
  } catch (err) { next(err); }
});
export default router;
