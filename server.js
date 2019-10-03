const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

// init middleware
app.use(express.json({ extended: false }));
app.get('/', (req, res) => {
  res.send('Running');
});

// Routes
app.use('/api/user', require('./routes/api/users'));
app.use('/api/actors', require('./routes/api/actors'));
app.use('/api/movies', require('./routes/api/movies'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
