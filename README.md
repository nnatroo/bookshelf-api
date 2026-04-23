# BookShelf API

A RESTful CRUD API for managing a personal book collection.

## Stack

- **Express.js** — HTTP server & routing
- **Mongoose** — MongoDB ODM
- **dotenv** — environment configuration
- **express-validator** — input validation
- **morgan** — request logging

## Getting Started

```bash
npm install
cp .env.example .env   # then edit values
npm run dev            # or: npm start
```

By default the server listens on `PORT` (3000) and connects to `MONGODB_URI`.

## Endpoints

| Method | Route             | Description       |
| ------ | ----------------- | ----------------- |
| GET    | `/api/books`      | List all books    |
| GET    | `/api/books/:id`  | Get a single book |
| POST   | `/api/books`      | Create a book     |
| PUT    | `/api/books/:id`  | Update a book     |
| DELETE | `/api/books/:id`  | Delete a book     |

Plus `GET /health` for a basic status check.

## Book Schema

| Field           | Type   | Notes                              |
| --------------- | ------ | ---------------------------------- |
| `title`         | String | required                           |
| `author`        | String | required                           |
| `genre`         | String | optional                           |
| `publishedYear` | Number | optional, integer 0 .. nextYear    |
| `rating`        | Number | optional, 0–5                      |
| `createdAt`     | Date   | auto-set on creation               |

## Seeding

Populate the database with sample books (`seeds/books.json`):

```bash
npm run seed          # insert seeds, skip existing (title+author match)
npm run seed:fresh    # wipe books collection, then insert seeds
npm run seed:clear    # wipe books collection only
```

## Example

```bash
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -d '{"title":"Dune","author":"Frank Herbert","genre":"Sci-Fi","publishedYear":1965,"rating":5}'
```
