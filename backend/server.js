import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB Atlas / Local MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';


 // CORS configuration supporting credentials for HttpOnly cookies
const allowedOrigins = [
  CLIENT_URL,
  'http://localhost:5173',
  'http://127.0.0.1:5173',
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (
        allowedOrigins.includes(origin) ||
        process.env.NODE_ENV !== 'production'
      ) {
        return callback(null, true);
      }

      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);


// Body parsing and cookie parsing middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Root API Welcome route
app.get('/', (req, res) => {
  res.json({
    message: '🌸 Welcome to the BloomTask API — Cozy Task Management Server',
    status: 'healthy',
    version: '2.0.0',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      tasks: '/api/tasks',
    },
  });
});

// Health-check endpoint for server verification and monitoring
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'BloomTask API is healthy and operational',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    database: {
      status: 'configured',
      driver: 'Mongoose',
    },
  });
});

// Mount application API routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// 404 Route Handler and Centralized Error Handling
app.use(notFound);
app.use(errorHandler);

// Start the Express server
app.listen(PORT, () => {
  console.log(`🌸 BloomTask Server is running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  console.log(`📡 Health check available at: http://localhost:${PORT}/api/health`);
  console.log(`🔐 Auth API mounted at: http://localhost:${PORT}/api/auth`);
  console.log(`🌱 Tasks API mounted at: http://localhost:${PORT}/api/tasks`);
});

export default app;
