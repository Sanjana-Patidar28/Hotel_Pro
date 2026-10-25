
import 'dotenv/config';
import mongoose from 'mongoose';
import Hotel from './models/Hotel.js';

const cityHotels = {
  Delhi: ['The Imperial Delhi', 'The Leela Palace New Delhi', 'Taj Palace New Delhi', 'The Lalit New Delhi'],
  Mumbai: ['The Taj Mahal Palace', 'The Oberoi Mumbai', 'Trident Nariman Point', 'ITC Grand Central'],
  Jaipur: ['Rambagh Palace', 'Jai Mahal Palace', 'ITC Rajputana', 'Alsisar Haveli'],
  Goa: ['Taj Exotica Resort & Spa', 'The Leela Goa', 'ITC Grand Goa', 'Grand Hyatt Goa'],
  Agra: ['The Oberoi Amarvilas', 'ITC Mughal', 'Taj Hotel & Convention Centre', 'Courtyard by Marriott Agra'],
  Udaipur: ['The Leela Palace Udaipur', 'Taj Lake Palace', 'Trident Udaipur', 'Fateh Prakash Palace'],
  Bengaluru: ['The Leela Palace Bengaluru', 'Taj West End', 'ITC Gardenia', 'The Oberoi Bengaluru'],
  Hyderabad: ['Taj Falaknuma Palace', 'ITC Kohenur', 'Park Hyatt Hyderabad', 'Trident Hyderabad'],
  Kochi: ['Grand Hyatt Kochi Bolgatty', 'Taj Malabar Resort & Spa', 'Le Meridien Kochi', 'Crowne Plaza Kochi'],
  Varanasi: ['Taj Ganges Varanasi', 'BrijRama Palace', 'Radisson Hotel Varanasi', 'Ramada Plaza JHV']
};

const cities = Object.keys(cityHotels);

const prefixes = [
  'Sunrise', 'Royal', 'Emerald', 'Maple', 'Lotus',
  'Silver', 'Golden', 'Palm Grove', 'Urban Nest',
  'Heritage', 'Regal', 'Serene', 'Hillview', 'Lakeview',
  'Grand', 'Comfort', 'Amber', 'Orchid', 'Skyline', 'Green Leaf'
];

const suffixes = [
  'Hotel', 'Residency', 'Retreat', 'Suites', 'Inn',
  'Palace', 'Lodge', 'Haven', 'Stay', 'House'
];

const roomTemplates = [
  {
    type: 'Standard',
    pricePerNight: 2499,
    capacity: 2,
    amenities: ['Wi-Fi', 'Air conditioning', 'TV'],
    totalRooms: 5
  },
  {
    type: 'Deluxe',
    pricePerNight: 3999,
    capacity: 2,
    amenities: ['Wi-Fi', 'Air conditioning', 'TV', 'Breakfast'],
    totalRooms: 4
  },
  {
    type: 'Suite',
    pricePerNight: 6999,
    capacity: 4,
    amenities: ['Wi-Fi', 'Air conditioning', 'TV', 'Breakfast', 'Living area'],
    totalRooms: 2
  }
];

const hotelImages = [
  'https://images.unsplash.com/photo-1566073771259-6a8506099945',
  'https://images.unsplash.com/photo-1564501049412-61c2a3083791',
  'https://images.unsplash.com/photo-1571896349842-33c89424de2d',
  'https://images.unsplash.com/photo-1582719508461-905c673771fd'
];

const roomImages = [
  'https://images.unsplash.com/photo-1611892440504-42a792e24d32',
  'https://images.unsplash.com/photo-1590490360182-c33d57733427',
  'https://images.unsplash.com/photo-1618773928121-c32242e63f39'
];

function makeRooms() {
  return roomTemplates.map((room, index) => ({
    ...room,
    amenities: [...room.amenities],
    imageUrl: roomImages[index]
  }));
}

async function seedHotels() {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is missing from your .env file.');
  }

  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to database:', mongoose.connection.name);

  // Add hotels until the collection contains 100.
  let count = await Hotel.countDocuments();
  let added = 0;
  let candidate = 0;

  while (count < 100) {
    const city = cities[candidate % cities.length];
    const prefix = prefixes[Math.floor(candidate / suffixes.length) % prefixes.length];
    const suffix = suffixes[candidate % suffixes.length];
    const name = `${prefix} ${city} ${suffix}`;

    candidate++;

    const exists = await Hotel.exists({ name, city });
    if (exists) continue;

    await Hotel.create({
      name,
      city,
      address: `Main Road, ${city}, India`,
      description: `Demo hotel in ${city} with comfortable rooms for different budgets.`,
      rating: Number((3.6 + ((candidate * 7) % 14) / 10).toFixed(1)),
      imageUrl: hotelImages[candidate % hotelImages.length],
      rooms: makeRooms()
    });

    count++;
    added++;
  }

  // Repair existing hotels that have fewer than 3 room types.
  // Saving rooms through Mongoose creates valid room subdocument IDs.
  const hotels = await Hotel.find();

  let repaired = 0;

  for (const hotel of hotels) {
    const needsRepair =
      !hotel.rooms ||
      hotel.rooms.length !== 3 ||
      hotel.rooms.some(room => !room._id);

    if (needsRepair) {
      hotel.rooms = makeRooms();
      await hotel.save();
      repaired++;
    }
  }

  console.log(`New hotels added: ${added}`);
  console.log(`Hotels with room data repaired: ${repaired}`);
  console.log(`Total hotels in database: ${await Hotel.countDocuments()}`);
  console.log('Each repaired/new hotel has Standard, Deluxe and Suite rooms.');
}

try {
  await seedHotels();
} catch (error) {
  console.error('Seeding failed:', error.message);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
