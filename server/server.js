const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173'
}));

// Route files
const auth = require('./routes/authRoutes');
const leaves = require('./routes/leaveRoutes');
const users = require('./routes/userRoutes');

// Mount routers
app.use('/api/auth', auth);
app.use('/api/leaves', leaves);
app.use('/api/users', users);

// Basic route
app.get('/', (req, res) => {
    res.send('Leave Management API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
