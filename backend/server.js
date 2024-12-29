require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');  // User Authentication Route
const objectRoutes = require('./routes/objectRoutes'); // Object Management Route

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Mount Authentication Route
app.use('/api/auth', authRoutes);
app.use('/api/objects', objectRoutes);

// Connect to the database and start the server
const PORT = 5000;
const MONGO_URI = process.env.MONGO_URI;
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => console.log(err));
