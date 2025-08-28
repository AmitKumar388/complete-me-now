# Notes Backend API

A RESTful API for a note-taking application built with Node.js, TypeScript, Express, and MongoDB.

## Features

- User authentication (JWT)
- CRUD operations for notes
- Input validation
- Rate limiting
- Error handling
- TypeScript support
- MongoDB integration

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Installation

1. Navigate to the backend directory:
```bash
cd back
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/notes-app
JWT_SECRET=your-super-secret-jwt-key-here
FRONTEND_URL=http://localhost:3000
```

5. Start MongoDB (if running locally)

6. Run the development server:
```bash
npm run dev
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)
- `POST /api/auth/logout` - Logout user (protected)

### Notes

- `GET /api/notes` - Get all notes (protected)
- `GET /api/notes/:id` - Get single note (protected)
- `POST /api/notes` - Create new note (protected)
- `PUT /api/notes/:id` - Update note (protected)
- `DELETE /api/notes/:id` - Delete note (protected)
- `PATCH /api/notes/:id/pin` - Toggle pin status (protected)

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run tests

## Project Structure

```
back/
├── src/
│   ├── config/
│   │   └── database.ts
│   ├── middleware/
│   │   ├── auth.ts
│   │   └── errorHandler.ts
│   ├── models/
│   │   ├── User.ts
│   │   └── Note.ts
│   ├── routes/
│   │   ├── auth.ts
│   │   └── notes.ts
│   └── server.ts
├── .env.example
├── package.json
├── tsconfig.json
└── README.md
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/notes-app |
| JWT_SECRET | Secret for JWT tokens | - |
| FRONTEND_URL | Frontend URL for CORS | http://localhost:3000 |
| NODE_ENV | Environment | development |

## Technologies Used

- **Express.js** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **Joi** - Input validation
- **bcryptjs** - Password hashing
- **Helmet** - Security headers
- **CORS** - Cross-origin requests
- **Rate limiting** - API protection

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Rate limiting
- Input validation
- Security headers with Helmet
- CORS configuration

## Production Deployment

1. Build the project:
```bash
npm run build
```

2. Set environment variables for production

3. Start the server:
```bash
npm start
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request