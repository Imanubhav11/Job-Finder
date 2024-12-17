import express from 'express';
import dotenv from 'dotenv';
dotenv.config(); // Load .env file first
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './utils/db.js';
import userRoutes from './routes/userRoute.js';
import companyRoutes from './routes/companyRoute.js';
import jobRoutes from './routes/jobRoute.js';
import applicationRoute from './routes/applicationRoute.js';
import path from 'path';


const app = express();

app.get('/home', async (req, res) => {
  res.status(200).json({
    message: 'Hello from backend',
    success: true,
  });
});

const _dirname = path.resolve();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: 'https://job-finder-vj0e.onrender.com',
  credentials: true,
};
app.use(cors(corsOptions));

// Routes
app.use('/api/user', userRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/job', jobRoutes);
app.use('/api/application', applicationRoute);

// Serve frontend
app.use(express.static(path.join(_dirname, '/frontend/dist')));
app.get('*', (_, res) => {
  res.sendFile(path.join(_dirname, 'frontend', 'dist', 'index.html'));
});

// Start server
const port = 7018;
app.listen(port, () => {
  connectDB();
  console.log(`Server is live on Port:${port}`);
});
