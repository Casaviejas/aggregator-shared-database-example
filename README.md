# Aggregator and Shared Databased example

A full-stack application demonstrating two microservices patterns: **Shared Database** and **Aggregator**.

Users can register, log in, edit their profile, and manage orders. The frontend only communicates with the aggregator, which internally calls the two backend services.

---

## Architecture

```
frontend/          → talks only to the aggregator
aggregator/        → receives all requests, calls user-service and orders-service
user-service/      → handles auth and user profile
orders-service/    → handles orders CRUD
```

**Shared Database**: `user-service` and `orders-service` connect to the same MongoDB Atlas cluster, each accessing only their own collection.

**Aggregator**: when the frontend requests a user's profile, the aggregator calls both services in parallel and returns a single combined response.

---

## Tech Stack

**Frontend** — React 18, TypeScript, Vite, Tailwind CSS, React Router  
**Backend** — Node.js, Express, TypeScript, Prisma, MongoDB  
**Auth** — JWT + bcryptjs

---

## Project Structure

```
/
├── frontend/
├── aggregator/
├── user-service/
└── orders-service/
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [MongoDB Atlas](https://www.mongodb.com/atlas) account (free tier works)

---

### user-service (port 3001)

```bash
cd user-service
npm install
cp .env.example .env
npx prisma generate
npm run dev
```

`.env`:
```env
DATABASE_URL="mongodb+srv://..."
JWT_SECRET="your-secret"
PORT=3001
NODE_ENV=development
```

---

### orders-service (port 3002)

```bash
cd orders-service
npm install
cp .env.example .env
npx prisma generate
npm run dev
```

`.env`:
```env
DATABASE_URL="mongodb+srv://..."   # same Atlas cluster as user-service
JWT_SECRET="your-secret"           # same secret as user-service
PORT=3002
NODE_ENV=development
```

---

### aggregator (port 3000)

```bash
cd aggregator
npm install
cp .env.example .env
npm run dev
```

`.env`:
```env
JWT_SECRET="your-secret"
PORT=3000
NODE_ENV=development
USER_SERVICE_URL="http://localhost:3001"
ORDERS_SERVICE_URL="http://localhost:3002"
FRONTEND_URL="http://localhost:5173"
```

---

### frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

`.env`:
```env
VITE_API_URL=http://localhost:3000
```

The app will be available at `http://localhost:5173`.

---

## API Endpoints

All requests from the frontend go through the aggregator.

### Auth
| Method | Path | Auth | Description |
|--------|------|:----:|-------------|
| POST | `/auth/register` | No | Create a new account |
| POST | `/auth/login` | No | Log in, returns JWT |

### Profile (Aggregator)
| Method | Path | Auth | Description |
|--------|------|:----:|-------------|
| GET | `/profile` | Yes | Get user profile + their orders |
| PUT | `/profile` | Yes | Update name and bio |
| DELETE | `/profile` | Yes | Delete account permanently |

### Orders
| Method | Path | Auth | Description |
|--------|------|:----:|-------------|
| GET | `/orders` | Yes | List orders for the authenticated user |
| POST | `/orders` | Yes | Create a new order |
| PUT | `/orders/:id` | Yes | Update an order |
| DELETE | `/orders/:id` | Yes | Delete an order |

Authenticated requests must include:
```
Authorization: Bearer <token>
```

---

## Features

- Login and registration on a single page with a toggle
- JWT stored in localStorage, validated on every page load
- Protected routes — unauthenticated users are redirected to `/login`
- Profile page with name and bio editing and account deletion
- Orders CRUD accessible from the profile page
- Passwords hashed with bcryptjs (salt rounds: 10)
- CORS configured to only allow requests from the frontend origin

---

## License

MIT