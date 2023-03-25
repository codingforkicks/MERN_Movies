const mongoose = require('mongoose');
let reviewSchema = mongoose.Schema({
    description:{
        type: String,
        required: true
    },
    enteredBy:{
        type: mongoose.ObjectId,
        required: true
    },
    movie:{
        type: mongoose.ObjectId,
        required: true
    },
    rating:{
        type: Number,
        required: true
    },
});

module.exports = Review = mongoose.model('review', reviewSchema, 'reviews');