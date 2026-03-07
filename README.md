# Auth App

A minimal full-stack authentication app built with React, TypeScript, and Node.js. Supports user login, registration, and profile editing.

---

## Tech Stack

**Frontend** — React 18, TypeScript, Vite, Tailwind CSS, React Router  
**Backend** — Node.js, Express, TypeScript, Prisma, MongoDB  
**Auth** — JWT + bcryptjs

---

## Project Structure

```
/
├── frontend/        # React + Vite + Tailwind
└── backend/         # Express + Prisma + MongoDB
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [MongoDB Atlas](https://www.mongodb.com/atlas) account (free tier works)

---

### Backend

```bash
cd backend
npm install
cp .env.example .env
```

Fill in your `.env`:

```env
DATABASE_URL="mongodb+srv://user:password@cluster.mongodb.net/myapp"
JWT_SECRET="your-long-random-secret"
PORT=3000
NODE_ENV=development
FRONTEND_URL="http://localhost:5173"
```

Generate a secure `JWT_SECRET`:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Then run:
```bash
npx prisma generate
npm run dev
```

The server will be available at `http://localhost:3000`.

---

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
```

Fill in your `.env`:

```env
VITE_API_URL=http://localhost:3000
```

Then run:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## API Endpoints

| Method | Path | Auth required | Description |
|--------|------|:---:|-------------|
| POST | `/auth/register` | No | Create a new account |
| POST | `/auth/login` | No | Log in, returns JWT |
| GET | `/profile` | Yes | Get current user profile |
| PUT | `/profile` | Yes | Update name and bio |
| DELETE | `/profile` | Yes | Delete account permanently |

Authenticated requests must include the following header:
```
Authorization: Bearer <token>
```

---

## Features

- Login and registration on a single page with a toggle
- JWT stored in localStorage, validated on every page load
- Protected routes — unauthenticated users are redirected to `/login`
- Profile page with name and bio editing
- Passwords hashed with bcryptjs (salt rounds: 10)
- CORS configured to only allow requests from the frontend origin

---

## License

MIT