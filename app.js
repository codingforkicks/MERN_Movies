const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

//routes
const router = require('./routes/api/routes');
const app = express();

//connect to database
connectDB();

//use cors
app.use(cors());

//init middleware
app.use(express.json());
app.use(router);

app.get('/', (req, res) => res.send('Generic App Setup Complete'));

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));