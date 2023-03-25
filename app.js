const express = require('express');
const connectDB = require('./config/db');

const app = express();

//connect to database
connectDB();

app.get('/', (req, res) => res.send('Generic App Setup Complete'));

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));