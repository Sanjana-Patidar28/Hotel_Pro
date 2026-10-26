
import 'dotenv/config';
import mongoose from 'mongoose';
import Hotel from './models/Hotel.js';

const photos = [
  'photo-1566073771259-6a8506099945',
  'photo-1564501049412-61c2a3083791',
  'photo-1571896349842-33c89424de2d',
  'photo-1582719508461-905c673771fd',
  'photo-1542314831-068cd1dbfeeb',
  'photo-1520250497591-112f2f40a3f4',
  'photo-1571003123894-1f0594d2b5d9',
  'photo-1445019980597-93fa8acb246c',
  'photo-1564013799919-ab600027ffc6',
  'photo-1512918728675-ed5a9ecdebfd',
  'photo-1578683010236-d716f9a3f461',
  'photo-1590490360182-c33d57733427',
  'photo-1611892440504-42a792e24d32',
  'photo-1618773928121-c32242e63f39',
  'photo-1566665797739-1674de7a421a',
  'photo-1540541338287-41700207dee6',
  'photo-1540518614846-7eded433c457',
  'photo-1596394516093-501ba68a0ba6',
  'photo-1584132967334-10e028bd69f7',
  'photo-1596436889106-be35e843f974',
  'photo-1595576508898-0ad5c879a061',
  'photo-1601918774946-25832a4be0d6',
  'photo-1600607687939-ce8a6c25118c',
  'photo-1499793983690-e29da59ef1c2',
  'photo-1535827841776-24afc1e255ac',
  'photo-1529290130-4ca3753253ae',
  'photo-1511818966892-d7d671e672a2',
  'photo-1584132915807-fd1f5fbc078f',
  'photo-1590490360182-c33d57733427',
  'photo-1540518614846-7eded433c457'
];

try {
  await mongoose.connect(process.env.MONGODB_URI);

  const hotels = await Hotel.find().sort({ _id: 1 });

  
const usedPhotosByCity = new Map();
const uniquePhotos = [...new Set(photos)];

for (const hotel of hotels) {
  const city = hotel.city.trim().toLowerCase();

  if (!usedPhotosByCity.has(city)) {
    usedPhotosByCity.set(city, new Set());
  }

  const usedPhotos = usedPhotosByCity.get(city);
  const availablePhotos = uniquePhotos.filter(
    photo => !usedPhotos.has(photo)
  );

  if (availablePhotos.length === 0) {
    throw new Error(
      `Not enough unique photos for ${hotel.city}. Add more photo IDs first.`
    );
  }

  const photo = availablePhotos[
    Math.floor(Math.random() * availablePhotos.length)
  ];

  usedPhotos.add(photo);

  hotel.imageUrl =
    `https://images.unsplash.com/${photo}?auto=format&fit=crop&w=900&q=80`;

  await hotel.save();
}


  console.log(`Updated photos for ${hotels.length} hotels.`);
} catch (error) {
  console.error('Photo update failed:', error.message);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
