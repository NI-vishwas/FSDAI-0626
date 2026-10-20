# Listings REST API

A Node.js + Express + MongoDB REST API for managing housing listings.

## Features

- Express REST API (`/api/v1/listings`)
- MongoDB integration with Mongoose
- Standardized success/error response DTOs
- Swagger/OpenAPI documentation
- CORS enabled

## Tech Stack

- Node.js
- Express
- MongoDB + Mongoose
- Swagger UI (`swagger-ui-express`)
- dotenv

## Project Structure

```text
.
├── server.js
├── env.example
├── models/
│   └── Listings.js
├── routes/
│   └── listingRoutes.js
├── seed_data/
│   └── seed_data.json
└── dtos/
    ├── apiResponseDto.js
    ├── listingDto.js
    └── swagger.js
```

## Prerequisites

- Node.js 18+
- npm
- MongoDB connection string (Atlas or local)

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env` from `env.example` and update values:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

3. Start the server:

```bash
npm run dev
```

For production mode:

```bash
npm start
```

## Load Initial Data (Seed)

Initial listing records are available in [seed_data/seed_data.json](seed_data/seed_data.json).

### Option A: Import with `mongoimport` (recommended)

1. Make sure MongoDB Database Tools are installed (`mongoimport` command).
2. Import JSON array into the `listings` collection:

```bash
mongoimport \
  --uri="mongodb+srv://<username>:<password>@<cluster>/<dbname>?retryWrites=true&w=majority" \
  --collection=listings \
  --file=seed_data/seed_data.json \
  --jsonArray
```

For local MongoDB:

```bash
mongoimport \
  --uri="mongodb://127.0.0.1:27017/<dbname>" \
  --collection=listings \
  --file=seed_data/seed_data.json \
  --jsonArray
```

3. Start the API and verify:
   - `GET /api/v1/listings`

### Option B: Insert from MongoDB Compass

1. Open your database in Compass.
2. Open/create collection `listings`.
3. Use **Add Data → Import JSON**.
4. Select [seed_data/seed_data.json](seed_data/seed_data.json) and import.

## Scripts

- `npm run dev` — Run with nodemon
- `npm start` — Run with Node.js

## API Base URL

`http://localhost:5000` (or your configured `PORT`)

## Endpoints

### 1) Get all listings

- **Method:** `GET`
- **URL:** `/api/v1/listings`
- **Response:** Success response with `data` as an array of listings

### 2) Get listing by ID

- **Method:** `GET`
- **URL:** `/api/v1/listings/:id`
- **Path param:** `id` (number)
- **Responses:**
  - `200` when found
  - `400` for invalid id
  - `404` when not found

### 3) Create a listing

- **Method:** `POST`
- **URL:** `/api/v1/listings`
- **Body (JSON):**

```json
{
  "id": 1,
  "name": "Acme Fresh Start Housing",
  "city": "Chicago",
  "state": "IL",
  "photo": "https://example.com/photo.jpg",
  "availableUnits": 4,
  "wifi": true,
  "laundry": true
}
```

- **Responses:**
  - `201` when created
  - `400` for validation/input errors

## Swagger Docs

Once the server is running:

- Swagger UI: `http://localhost:5000/api-docs`
- OpenAPI JSON: `http://localhost:5000/openapi.json`

## Response Format

### Success

```json
{
  "success": true,
  "message": "Operation completed",
  "data": {},
  "meta": null,
  "timestamp": "2026-10-20T00:00:00.000Z"
}
```

### Error

```json
{
  "success": false,
  "message": "Request failed",
  "errors": "Validation error",
  "timestamp": "2026-10-20T00:00:00.000Z"
}
```

## Notes

- Listing `id` is handled as a numeric field separate from MongoDB `_id`.
- Ensure `MONGO_URI` is valid before starting the server.
