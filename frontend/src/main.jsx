
import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const API =
  import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const cities = [
  'Delhi', 'Mumbai', 'Jaipur', 'Goa', 'Agra',
  'Udaipur', 'Bengaluru', 'Hyderabad', 'Kochi', 'Varanasi'
];

const hotelNames = {
  Delhi: [
    'The Grand Imperial Delhi', 'The Leela Palace New Delhi',
    'ITC Maurya', 'The Claridges', 'The Lodhi',
    'Taj Palace New Delhi', 'Roseate House', 'Andaz Delhi',
    'The Imperial New Delhi', 'The Oberoi New Delhi'
  ],
  Mumbai: [
    'The Taj Mahal Palace', 'The Oberoi Mumbai',
    'Taj Lands End', 'Trident Nariman Point',
    'The St. Regis Mumbai', 'ITC Maratha',
    'JW Marriott Juhu', 'Sofitel Mumbai BKC',
    'Four Seasons Mumbai', 'The Leela Mumbai'
  ],
  Jaipur: [
    'Rambagh Palace', 'Fairmont Jaipur', 'ITC Rajputana',
    'Jai Mahal Palace', 'Samode Haveli', 'Alsisar Haveli',
    'The Leela Palace Jaipur', 'Trident Jaipur',
    'Royal Heritage Haveli', 'Shahpura House'
  ],
  Goa: [
    'Taj Exotica Resort', 'Grand Hyatt Goa', 'W Goa',
    'The Leela Goa', 'Alila Diwa Goa', 'ITC Grand Goa',
    'Novotel Goa Resort', 'Park Hyatt Goa',
    'Cidade de Goa', 'Holiday Inn Goa'
  ],
  Agra: [
    'The Oberoi Amarvilas', 'ITC Mughal', 'Trident Agra',
    'Taj Hotel and Convention Centre', 'Grand Mercure Agra',
    'Courtyard by Marriott Agra', 'Jaypee Palace',
    'DoubleTree by Hilton Agra', 'Crystal Sarovar Premiere',
    'Hotel Clarks Shiraz'
  ],
  Udaipur: [
    'Taj Lake Palace', 'The Oberoi Udaivilas',
    'Trident Udaipur', 'The Leela Palace Udaipur',
    'RAAS Devigarh', 'Fateh Garh', 'Shiv Niwas Palace',
    'Jagat Niwas Palace', 'Chunda Palace', 'Bamboo Saa Resort'
  ],
  Bengaluru: [
    'The Leela Palace Bengaluru', 'ITC Gardenia',
    'Taj West End', 'The Oberoi Bengaluru',
    'JW Marriott Bengaluru', 'Conrad Bengaluru',
    'Ritz-Carlton Bengaluru', 'Sheraton Grand Bengaluru',
    'Hyatt Centric MG Road', 'Vivanta Bengaluru'
  ],
  Hyderabad: [
    'Taj Falaknuma Palace', 'Taj Krishna',
    'Trident Hyderabad', 'ITC Kohenur',
    'Park Hyatt Hyderabad', 'The Westin Hyderabad',
    'Novotel Hyderabad', 'Hyatt Place Hyderabad',
    'Marriott Hotel Hyderabad', 'Radisson Blu Hyderabad'
  ],
  Kochi: [
    'Grand Hyatt Kochi Bolgatty', 'Le Meridien Kochi',
    'Casino Hotel', 'Taj Malabar Resort',
    'Crowne Plaza Kochi', 'Fragrant Nature Kochi',
    'Forte Kochi', 'Brunton Boatyard',
    'Holiday Inn Cochin', 'Ramada Resort Kochi'
  ],
  Varanasi: [
    'Taj Ganges', 'BrijRama Palace',
    'Radisson Hotel Varanasi', 'Taj Nadesar Palace',
    'Ramada Plaza JHV', 'Hotel Madin',
    'DoubleTree by Hilton Varanasi', 'Rivatas by Ideal',
    'Amritara Suryauday Haveli', 'Pearl Courtyard'
  ]
};




const hotelImages = [
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1455587734955-081b22074882?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1517840901100-8179e982acb7?auto=format&fit=crop&w=1000&q=85'
];

const roomImages = [
  'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=85',
  'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=85',
  'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=85'
];


const sampleHotels = cities.flatMap((city, cityIndex) =>
  hotelNames[city].map((name, index) => ({
    _id: `demo-${city.toLowerCase()}-${index}`,
    name,
    city,
    address: `${city}, India`,
    rating: Number((4.2 + (index % 8) / 10).toFixed(1)),
    imageUrl: hotelImages[(cityIndex * 7 + index) % hotelImages.length],
    description: `Enjoy a comfortable stay at ${name}, ${city}.`,
    rooms: [
      {
        _id: `demo-${cityIndex}-${index}-standard`,
        type: 'Standard Room',
        capacity: 2,
        pricePerNight: 1499 + cityIndex * 100,
        amenities: ['Wi-Fi', 'AC', 'TV'],
        imageUrl: roomImages[0]
      },
      {
        _id: `demo-${cityIndex}-${index}-deluxe`,
        type: 'Deluxe Room',
        capacity: 3,
        pricePerNight: 2499 + cityIndex * 100,
        amenities: ['Wi-Fi', 'AC', 'Room Service'],
        imageUrl: roomImages[1]
      },
      {
        _id: `demo-${cityIndex}-${index}-suite`,
        type: 'Luxury Suite',
        capacity: 4,
        pricePerNight: 3999 + cityIndex * 100,
        amenities: ['Wi-Fi', 'AC', 'Breakfast'],
        imageUrl: roomImages[2]
      }
    ]
  }))
);

const money = value =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(value || 0);

function getToken() {
  return localStorage.getItem('hotelpro_token') || '';
}

async function api(path, options = {}) {
  const headers = {
    ...(options.body ? { 'Content-Type': 'application/json' } : {}),
    ...(getToken()
      ? { Authorization: `Bearer ${getToken()}` }
      : {}),
    ...options.headers
  };

  const response = await fetch(`${API}${path}`, {
    ...options,
    headers
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      data.message || 'Something went wrong. Please try again.'
    );
  }

  return data;
}

function App() {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('hotelpro_user') || 'null');
    } catch {
      return null;
    }
  });

  const [city, setCity] = useState('All cities');
  const [hotels, setHotels] = useState([]);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [roomChoice, setRoomChoice] = useState(null);
  const [page, setPage] = useState('explore');

  const [authMode, setAuthMode] = useState('login');
  const [authOpen, setAuthOpen] = useState(false);
  const [auth, setAuth] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });

  const [dates, setDates] = useState({
    checkIn: '',
    checkOut: '',
    guests: 2
  });

  const [bookings, setBookings] = useState([]);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState({ type: '', text: '' });

  const today = new Date().toLocaleDateString('en-CA');

  const filteredHotels = hotels.filter(hotel => {
    const matchesCity =
      city === 'All cities' || hotel.city === city;

    const term = search.trim().toLowerCase();

    const matchesSearch =
      !term ||
      hotel.name.toLowerCase().includes(term) ||
      hotel.city.toLowerCase().includes(term);

    return matchesCity && matchesSearch;
  });

  useEffect(() => {
    if (page === 'bookings' && user) {
      loadBookings();
    }
  }, [page, user]);
useEffect(() => {
  async function fetchHotels() {
    try {
      const data = await api('/hotels');
      setHotels(Array.isArray(data) ? data : []);
    } catch (error) {
      setNotice({ type: 'error', text: error.message });
    }
  }

  fetchHotels();
}, []);
  async function loadBookings() {
    try {
      const data = await api('/bookings/mine');
      setBookings(Array.isArray(data) ? data : []);
    } catch (error) {
      setNotice({ type: 'error', text: error.message });
    }
  }

  async function submitAuth(event) {
    event.preventDefault();

    const registering = authMode === 'register';

    if (registering) {
      if (auth.name.trim().length < 2) {
        alert('Please enter your full name (at least 2 characters).');
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(auth.email.trim())) {
        alert('Please enter a valid email address.');
        return;
      }

      if (auth.password.length < 6) {
        alert('Password must contain at least 6 characters.');
        return;
      }
    }

    setBusy(true);
    setNotice({ type: '', text: '' });

    try {
      const path = registering ? '/auth/register' : '/auth/login';

      const data = await api(path, {
        method: 'POST',
        body: JSON.stringify({
          ...auth,
          name: auth.name.trim(),
          email: auth.email.trim()
        })
      });

      if (!data.token || !data.user) {
        throw new Error('The server did not return a valid login response.');
      }
      console.log('Login response:', data);
      console.log('Token received:', data.token);

      localStorage.setItem('hotelpro_token', data.token);
      localStorage.setItem('hotelpro_user', JSON.stringify(data.user));

      setUser(data.user);
      setAuthOpen(false);
      setAuth({ name: '', email: '', phone: '', password: '' });

      if (registering) {
        alert('Registration successful! Your account has been created.');
      } else {
        setNotice({
          type: 'success',
          text: `Welcome${data.user.name ? `, ${data.user.name}` : ''}!`
        });
      }
    } catch (error) {
      if (registering) {
        alert(error.message);
      } else {
        setNotice({ type: 'error', text: error.message });
      }
    } finally {
      setBusy(false);
    }
  }

  function logout() {
    localStorage.removeItem('hotelpro_token');
    localStorage.removeItem('hotelpro_user');

    setUser(null);
    setBookings([]);
    setPage('explore');
    setSelected(null);
    setRoomChoice(null);
    setNotice({ type: 'success', text: 'You have logged out.' });
  }

  function openHotel(hotel) {
    setSelected(hotel);
    setRoomChoice(hotel.rooms[0]);
    setDates({ checkIn: '', checkOut: '', guests: 2 });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function bookRoom(event) {
    event.preventDefault();

    if (!user) {
      setAuthMode('login');
      setAuthOpen(true);
      setNotice({
        type: 'error',
        text: 'Please log in before booking a room.'
      });
      return;
    }

    if (!selected || !roomChoice) {
  setNotice({
    type: 'error',
    text: 'Please select a hotel and room before booking.'
  });
  return;
}

    if (selected._id.startsWith('demo-')) {
      setNotice({
        type: 'error',
        text: 'This is a sample hotel. Add real hotels and rooms to MongoDB before booking.'
      });
      return;
    }

    if (
      !dates.checkIn ||
      !dates.checkOut ||
      new Date(dates.checkOut) <= new Date(dates.checkIn)
    ) {
      setNotice({
        type: 'error',
        text: 'Please choose valid check-in and check-out dates.'
      });
      return;
    }

    setBusy(true);

    
try {
  console.log('roomChoice:', roomChoice);
  console.log('room ID:', roomChoice?._id);

  const booking = await api('/bookings', {
    method: 'POST',
    body: JSON.stringify({
      hotelId: selected._id,
      roomId: roomChoice?._id,
      checkIn: dates.checkIn,
      checkOut: dates.checkOut,
      guests: Number(dates.guests)
    })
  });


      setNotice({
        type: 'success',
        text: `Booking created: ${booking._id || 'Success'}`
      });

      setPage('bookings');
      setSelected(null);
      setRoomChoice(null);
      await loadBookings();
    } catch (error) {
      setNotice({ type: 'error', text: error.message });
    } finally {
      setBusy(false);
    }
  }

  async function cancelBooking(id) {
    if (!window.confirm('Do you want to cancel this booking?')) return;

    try {
      await api(`/bookings/${id}/cancel`, { method: 'PATCH' });
      setNotice({ type: 'success', text: 'Booking cancelled.' });
      await loadBookings();
    } catch (error) {
      setNotice({ type: 'error', text: error.message });
    }
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <button
          className="brand"
          onClick={() => {
            setPage('explore');
            setSelected(null);
          }}
        >
          <span className="brand-mark">H</span>
          <span>
            hotel<span className="brand-light">_pro</span>
            <small>STAYS MADE SIMPLE</small>
          </span>
        </button>

        <nav>
          <button
            className={page === 'explore' ? 'nav-active' : ''}
            onClick={() => {
              setPage('explore');
              setSelected(null);
            }}
          >
            Explore stays
          </button>

          {user && (
            <button
              className={page === 'bookings' ? 'nav-active' : ''}
              onClick={() => {
                setPage('bookings');
                setSelected(null);
              }}
            >
              My bookings
            </button>
          )}
        </nav>

        <div className="account-area">
          {user ? (
            <>
              <span className="welcome">
                Hi, {user.name?.split(' ')[0] || 'Guest'}
              </span>
              <button className="btn btn-outline btn-small" onClick={logout}>
                Log out
              </button>
            </>
          ) : (
            <button
              className="btn btn-dark btn-small"
              onClick={() => {
                setAuthMode('login');
                setAuthOpen(true);
              }}
            >
              Log in / Sign up
            </button>
          )}
        </div>
      </header>

      {notice.text && (
        <div className={`notice ${notice.type}`} role="status">
          <span>{notice.text}</span>
          <button
            onClick={() => setNotice({ type: '', text: '' })}
            aria-label="Dismiss message"
          >
            ×
          </button>
        </div>
      )}

      {page === 'bookings' && user ? (
        <main className="content-page">
          <div className="eyebrow">YOUR TRAVEL PLANS</div>
          <h1>My bookings<span className="period">.</span></h1>
          <p className="muted">All your stays, gathered in one place.</p>

          {bookings.length === 0 ? (
            <div className="empty-state">
              <h2>No bookings yet</h2>
              <p>Your next getaway could start here.</p>
              <button
                className="btn btn-dark"
                onClick={() => setPage('explore')}
              >
                Explore hotels
              </button>
            </div>
          ) : (
            <div className="booking-list">
              {bookings.map(booking => (
                <article className="booking-card" key={booking._id}>
                  <div
                    className="booking-image"
                    style={{
                      backgroundImage: `url("${booking.hotel?.imageUrl || hotelImages[0]}")`
                    }}
                  />
                  <div className="booking-details">
                    <div className="booking-top">
                      <span className="eyebrow">
                        {(booking.city || booking.hotel?.city || 'INDIA').toUpperCase()}
                      </span>
                      <span
                        className={`status ${booking.status === 'Cancelled' ? 'cancelled' : ''}`}
                      >
                        {booking.status}
                      </span>
                    </div>

                    <h2>{booking.hotel?.name || 'Hotel booking'}</h2>
                    <p>{booking.roomType || 'Room'} · {booking.guests || 1} guest(s)</p>
                    <p>
                      {new Date(booking.checkIn).toLocaleDateString()} —{' '}
                      {new Date(booking.checkOut).toLocaleDateString()}
                    </p>

                    <div className="booking-bottom">
                      <strong>{money(booking.totalPrice)}</strong>
                      <span>ID: {String(booking._id).slice(-8).toUpperCase()}</span>

                      {booking.status !== 'Cancelled' && (
                        <button
                          className="text-button"
                          onClick={() => cancelBooking(booking._id)}
                        >
                          Cancel booking
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </main>
      ) : selected ? (
        <main className="content-page detail-page">
          <button className="back-link" onClick={() => setSelected(null)}>
            ← Back to hotels
          </button>

          <div
            className="detail-hero"
            style={{
              backgroundImage: `linear-gradient(90deg,rgba(12,37,35,.8),rgba(12,37,35,.08)),url("${selected.imageUrl}")`
            }}
          >
            <div>
              <span className="eyebrow light">
                {selected.city.toUpperCase()} · INDIA
              </span>
              <h1>{selected.name}</h1>
              <p>★ {selected.rating} guest rating · {selected.address}</p>
            </div>
          </div>

          <div className="detail-grid">
            <section>
              <div className="section-heading">
                <div>
                  <div className="eyebrow">ROOMS & RATES</div>
                  <h2>Find your kind of comfort</h2>
                </div>
                <span className="muted">Choose your room</span>
              </div>
              

              {selected.rooms.map(room => (
                <button
                  className={`room-card ${roomChoice?._id === room._id ? 'room-selected' : ''}`}
                  key={room._id}
                  onClick={() => {
  console.log('Selected room:', room);
  setRoomChoice(room);
}}
                >
                  <div
                    className="room-photo"
                    style={{ backgroundImage: `url("${room.imageUrl}")` }}
                    role="img"
                    aria-label={`${room.type} photo`}
                  />
                  <div className="room-info">
                    <h3>{room.type}</h3>
                    <p>Up to {room.capacity} guests</p>
                    <div className="amenities">{room.amenities.join(' · ')}</div>
                  </div>
                  <div className="room-price">
                    <strong>{money(room.pricePerNight)}</strong>
                    <span>per night</span>
                    <span className="radio-dot">
                      {roomChoice?._id === room._id ? '✓' : ''}
                    </span>
                  </div>
                </button>
              ))}
            </section>

            <aside className="reserve-card">
              <div className="eyebrow">YOUR STAY</div>
              <h2>Make it yours</h2>

              <form
  onSubmit={bookRoom}
  onInvalid={() => {
    setNotice({
      type: 'error',
      text: 'Please fill in all required fields.'
    });
  }}
>
                <label>
                  Check-in
                  <input
                    type="date"
                    min={today}
                    required
                    value={dates.checkIn}
                    onChange={event =>
                      setDates({ ...dates, checkIn: event.target.value })
                    }
                  />
                </label>

                <label>
                  Check-out
                  <input
                    type="date"
                    min={dates.checkIn || today}
                    required
                    value={dates.checkOut}
                    onChange={event =>
                      setDates({ ...dates, checkOut: event.target.value })
                    }
                  />
                </label>

                <label>
                  Guests
                  <select
                    value={dates.guests}
                    onChange={event =>
                      setDates({ ...dates, guests: event.target.value })
                    }
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(number => (
                      <option key={number} value={number}>
                        {number} guest{number > 1 ? 's' : ''}
                      </option>
                    ))}
                  </select>
                </label>

                {roomChoice && dates.checkIn && dates.checkOut &&
                  new Date(dates.checkOut) > new Date(dates.checkIn) && (
                    <div className="price-summary">
                      <span>Estimated total</span>
                      <strong>
                        {money(
                          Math.ceil(
                            (new Date(dates.checkOut) -
                              new Date(dates.checkIn)) / 86400000
                          ) * roomChoice.pricePerNight
                        )}
                      </strong>
                    </div>
                  )}

                <button
  type="submit"
  className="btn btn-dark btn-block"
  disabled={busy}
>
                  {busy ? 'Please wait…' : 'Book this room'}
                </button>
              </form>
            </aside>
          </div>
        </main>
      ) : (
        <>
          <section className="hero">
            <div
              className="hero-photo"
              style={{ backgroundImage: `url("${hotelImages[0]}")` }}
            />

            <div className="hero-inner">
              <div className="hero-copy">
                <div className="eyebrow light">
                  <span className="spark">✦</span> A BETTER WAY TO GET AWAY
                </div>
                <h1>Find your place<br />in <em>India.</em></h1>
                <p>
                  From lively city streets to quiet coastal mornings,
                  discover a stay that feels like yours.
                </p>
                <div className="hero-pills">
                  <span>✦ 10 destinations</span>
                  <span>◈ Sample hotels</span>
                  <span>♡ Three room types</span>
                </div>
              </div>

              <div className="search-panel">
                <div className="search-title">Where will you stay?</div>
                <div className="search-controls">
                  <label>
                    <span>DESTINATION</span>
                    <select
                      value={city}
                      onChange={event => {
                        setCity(event.target.value);
                        setTimeout(() => {
                          document.getElementById('stays')?.scrollIntoView({
                            behavior: 'smooth'
                          });
                        }, 50);
                      }}
                    >
                      <option>All cities</option>
                      {cities.map(item => (
                        <option key={item} value={item}>{item}</option>
                      ))}
                    </select>
                  </label>
                  <button
                    className="btn btn-gold"
                    onClick={() =>
                      document.getElementById('stays')?.scrollIntoView({
                        behavior: 'smooth'
                      })
                    }
                  >
                    Explore stays ↗
                  </button>
                </div>
              </div>
            </div>

            <div className="hero-caption">
              GOOD TRIPS START WITH A GOOD STAY
            </div>
          </section>

          <main className="content-page explore-page" id="stays">
            <div className="section-heading">
              <div>
                <div className="eyebrow">A LITTLE INSPIRATION</div>
                <h2>
                  {city === 'All cities'
                    ? 'Stays worth travelling for'
                    : `Hotels in ${city}`}
                  <span className="period">.</span>
                </h2>
              </div>
              
            </div>

            {filteredHotels.length === 0 ? (
              <div className="empty-state">
                <h2>No hotels found</h2>
                <p>Try a different hotel name or city.</p>
                <button
                  className="btn btn-dark"
                  onClick={() => {
                    setCity('All cities');
                    setSearch('');
                  }}
                >
                  Show all hotels
                </button>
              </div>
            ) : (
              <div className="hotel-grid">
                {filteredHotels.map(hotel => (
                  <article className="hotel-card" key={hotel._id}>
                    <button
                      className="hotel-photo"
                      onClick={() => openHotel(hotel)}
                      style={{ backgroundImage: `url("${hotel.imageUrl}")` }}
                      aria-label={`View ${hotel.name}`}
                    >
                      <span className="photo-tag">{hotel.city}</span>
                      <span className="photo-arrow">↗</span>
                    </button>

                    <div className="hotel-card-body">
                      <div className="hotel-meta">
                        <span>{hotel.city.toUpperCase()}, INDIA</span>
                        <span>★ {hotel.rating}</span>
                      </div>
                      <h3>{hotel.name}</h3>
                      <p>{hotel.description}</p>
                      <div className="hotel-card-footer">
                        <div>
                          <strong>{money(hotel.rooms[0].pricePerNight)}</strong>
                          <span> / night onwards</span>
                        </div>
                        <button onClick={() => openHotel(hotel)}>
                          View rooms →
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            <section className="promise-strip">
              <div className="promise-icon">✳</div>
              <div>
                <div className="eyebrow">TRAVEL WITHOUT THE FUSS</div>
                <h2>Your trip. Your pace. Your place.</h2>
                <p>Browse hotels, choose a room, and plan your next getaway.</p>
              </div>
              <button
                className="btn btn-outline"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Back to top ↑
              </button>
            </section>
          </main>
        </>
      )}

      <footer>
        <button
          className="brand footer-brand"
          onClick={() => {
            setPage('explore');
            setSelected(null);
          }}
        >
          <span className="brand-mark">H</span>
          <span>
            hotel<span className="brand-light">_pro</span>
            <small>STAYS MADE SIMPLE</small>
          </span>
        </button>
        <p>Made for your next somewhere.</p>
        <span>© {new Date().getFullYear()} Hotel_Pro · Demo project</span>
      </footer>

      {authOpen && (
        <div
          className="modal-backdrop"
          onMouseDown={event => {
            if (event.target === event.currentTarget) {
              setAuthOpen(false);
            }
          }}
        >
          <section className="auth-modal">
            <button
              className="modal-close"
              onClick={() => setAuthOpen(false)}
              aria-label="Close"
            >
              ×
            </button>

            <div className="eyebrow">WELCOME TO HOTEL_PRO</div>
            <h2>
              {authMode === 'login'
                ? 'Good to see you again.'
                : 'Make yourself at home.'}
            </h2>
            <p className="muted">
              {authMode === 'login'
                ? 'Log in to manage your stay.'
                : 'Create an account for your next stay.'}
            </p>

            <div className="auth-switch">
              <button
                className={authMode === 'login' ? 'switch-active' : ''}
                onClick={() => setAuthMode('login')}
              >
                Log in
              </button>
              <button
                className={authMode === 'register' ? 'switch-active' : ''}
                onClick={() => setAuthMode('register')}
              >
                Sign up
              </button>
            </div>

            <form onSubmit={submitAuth}>
              {authMode === 'register' && (
                <>
                  <label>
                    Full name
                    <input
                      required
                      autoComplete="name"
                      value={auth.name}
                      onChange={event =>
                        setAuth({ ...auth, name: event.target.value })
                      }
                      placeholder="Your name"
                    />
                  </label>
                  <label>
                    Phone number
                    <input
                      autoComplete="tel"
                      value={auth.phone}
                      onChange={event =>
                        setAuth({ ...auth, phone: event.target.value })
                      }
                      placeholder="Your phone number"
                    />
                  </label>
                </>
              )}

              <label>
                Email address
                <input
                  required
                  type="email"
                  autoComplete="email"
                  value={auth.email}
                  onChange={event =>
                    setAuth({ ...auth, email: event.target.value })
                  }
                  placeholder="you@example.com"
                />
              </label>

              <label>
                Password
                <input
                  required
                  minLength={6}
                  type="password"
                  autoComplete={
                    authMode === 'login'
                      ? 'current-password'
                      : 'new-password'
                  }
                  value={auth.password}
                  onChange={event =>
                    setAuth({ ...auth, password: event.target.value })
                  }
                  placeholder="At least 6 characters"
                />
              </label>

              <button className="btn btn-dark btn-block" disabled={busy}>
                {busy
                  ? 'Please wait…'
                  : authMode === 'login'
                    ? 'Log in'
                    : 'Create account'}
              </button>
            </form>

            <p className="fine-print">
              HotelPro demo. Use a unique password.
            </p>
          </section>
        </div>
      )}
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
