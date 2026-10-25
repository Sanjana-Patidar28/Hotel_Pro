import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  type: { type: String, required: true },
  pricePerNight: { type: Number, required: true, min: 1 },
  capacity: { type: Number, default: 2 },
  amenities: [{ type: String }],
  imageUrl: { type: String, default: '' },
  totalRooms: { type: Number, default: 5, min: 0 }
}, { _id: true });

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  city: { type: String, required: true, index: true },
  address: { type: String, default: '' },
  description: { type: String, default: '' },
  rating: { type: Number, min: 1, max: 5, default: 4 },
  imageUrl: { type: String, default: '' },
  rooms: [roomSchema]
}, { timestamps: true });

export default mongoose.model('Hotel', hotelSchema);
