const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  console.log('Serving asseets'); 
  app.use(express.static('client/build'));
  console.log('Serving asseets1'); 
  app.get('*', (req, res) => {

    console.log('Serving asseets3'); 
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    console.log('Serving asseets4'); 
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));