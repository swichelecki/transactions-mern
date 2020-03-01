const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const app = express();
const cors = require('cors');
const path = require('path');

dotenv.config({path: './config/config.env'});

connectDB();

//IMPORT ROUTE
const transactions = require('./routes/transactions');

app.use(cors());
app.use(express.json());

//MIDDLEWARE FOR ROUTES
app.use('/api/v1/transactions', transactions);

//HOME ROUTE
app.use(express.static('public'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('public'));
  
  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'public', 'index.html')));

}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`));