const express = require('express');
require('dotenv').config();
const cors = require('cors');
require('./config/db');

const app = express();
app.use(cors());              // ✅ ENABLE CORS
app.use(express.json());

const eventRoutes = require('./routes');
app.use('/api/events', eventRoutes);

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Event Service running on port ${PORT}`);
});
