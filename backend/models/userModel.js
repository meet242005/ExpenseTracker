const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    monthlyBudget: {
        type: Number,
        default: 0
    },
    expenses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Expense'
    }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
