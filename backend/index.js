const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');


require('dotenv').config({ path: '../.env' });

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose
    .connect(process.env.DB_CONNECTION_STRING)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });


app.use('/api', routes);







