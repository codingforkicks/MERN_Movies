const mongoose = require('mongoose');
let movieSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    year:{
        type: Number,
        required: true
    },
    genre:{
        type: String,
        required: true
    },
});

module.exports = Movie = mongoose.model('movie', movieSchema, 'movies');