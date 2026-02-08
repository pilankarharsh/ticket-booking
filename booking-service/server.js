const express = require('express');
require('dotenv').config();
const cors = require('cors');
require('./config/db');

const app = express();
app.use(cors());              
app.use(express.json());

const bookingRoutes = require('./routes');
app.use('/api/bookings', bookingRoutes);

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
  console.log(`Booking Service running on port ${PORT}`);
});
