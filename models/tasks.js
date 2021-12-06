const mongoose = require('mongoose');

// const taskSchema = mongoose.Schema({
//     name: String,
//     completed: Boolean
// });

// adding validation

const taskSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Cannot leave empty'],
        trim: true,
        maxlength: [20, 'Name cannot be greater than 20 characters']
    },
    completed: {
        type: Boolean,
        default: false,
    }
});

// the name in the params will be pluraled for the collection.
module.exports = mongoose.model('Task', taskSchema);