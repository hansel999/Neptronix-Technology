# Neptronix Backend API

Node.js + Express + MongoDB REST API for the Neptronix Technology e-commerce platform.

## Prerequisites

- Node.js 18+
- MongoDB running locally (`mongodb://127.0.0.1:27017`) or a MongoDB Atlas URI

## Setup & Run

```bash
cd server
npm install
npm run dev       # development with nodemon
# or
npm start         # production
```

Server starts at: **http://localhost:5000**

## Environment Variables (`.env`)

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `5000` | Server port |
| `MONGODB_URI` | `mongodb://127.0.0.1:27017/neptronix` | MongoDB connection string |
| `JWT_SECRET` | *(set a strong secret)* | JWT signing key |
| `JWT_EXPIRES_IN` | `7d` | Token expiry |
| `ADMIN_EMAIL` | `admin@neptronix.com` | Auto-promoted admin email |

## API Endpoints

### Auth
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | No | Register new user |
| POST | `/api/auth/login` | No | Login, returns JWT |
| GET | `/api/auth/me` | JWT | Get current user |
| PUT | `/api/auth/profile` | JWT | Update profile |
| PUT | `/api/auth/change-password` | JWT | Change password |

### Products
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/products` | No | List products (filter/search/sort/paginate) |
| GET | `/api/products/:id` | No | Get single product |
| POST | `/api/products` | Admin | Create product |
| PUT | `/api/products/:id` | Admin | Update product |
| DELETE | `/api/products/:id` | Admin | Delete product |

**Query params for GET /api/products:**
`category`, `brand`, `search`, `minPrice`, `maxPrice`, `inStock`, `sort` (price-asc, price-desc, rating, newest), `page`, `limit`

### Cart
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/cart` | JWT | Get user's cart |
| POST | `/api/cart` | JWT | Add/update item `{ productId, quantity }` |
| DELETE | `/api/cart/:productId` | JWT | Remove item |
| DELETE | `/api/cart` | JWT | Clear entire cart |

### Orders
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/orders` | JWT | User's orders (admin gets all) |
| GET | `/api/orders/:id` | JWT | Get single order |
| POST | `/api/orders` | JWT | Place order (clears cart) |
| PUT | `/api/orders/:id/status` | Admin | Update order status |

### Health
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Server health check |

## Admin Credentials

On first startup, an admin account is auto-created:
- **Email:** `admin@neptronix.com`
- **Password:** `admin123`

8 sample products are also seeded automatically if the database is empty.
