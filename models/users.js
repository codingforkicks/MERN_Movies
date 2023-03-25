const mongoose = require('mongoose');
let userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    admin:{
      type: Boolean,
      default: false
    }
});

module.exports = User = mongoose.model('user', userSchema, 'users');