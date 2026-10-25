# Hotel_Pro — Complete Hotel Booking and Management Solution

A beginner-friendly MERN starter for a hotel booking website. It includes:
- React + Vite frontend
- Express API backend
- 10 Indian cities with 4 sample hotel listings per city (demo inventory)
- Register/login with JWT
- Room selection and date-based booking without online payment
- My Bookings and cancellation
- Demo hotel/room data so you can explore the UI immediately

## Requirements
- Node.js (LTS recommended)
- npm
- MongoDB Atlas connection string (optional for persistent database mode)

## Start the project

### 1. Start backend
Open a terminal in `server`:
```bash
npm install
copy .env.example .env
npm run dev
```
On Windows PowerShell, `copy .env.example .env` also works. Edit `.env` and set `JWT_SECRET`.
If `MONGODB_URI` is empty, the server runs in demo mode with in-memory users/bookings. Demo data resets whenever the server restarts.

### 2. Start frontend
Open a second terminal in `client`:
```bash
npm install
npm run dev
```
Open the URL printed by Vite (usually http://localhost:5173).

## Notes
- Hotel names are examples for a student demo; listings, room rates, and availability are not live hotel inventory.
- No payment gateway is included. Bookings are demo reservations only.
- For public deployment, deploy the frontend and backend separately, configure environment variables, and use MongoDB Atlas for persistent data.
- Do not use real customer data in demo mode.
