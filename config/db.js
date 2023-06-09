const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/moviesapi');
        console.log("successfully connected to server");
        } catch (err) {
            console.log(err.message);
            process.exit(1);
        };
};

module.exports = connectDB;