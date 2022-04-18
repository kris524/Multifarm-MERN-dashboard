const mongoose = require('mongoose');

const PostSchema = mongoose.Schema('PostSchema', {
    
    date: {
        type: String,
        required: true,
    },
    datapoint: {
        type: Number,
        required: true,
    },

});

module.exports = mongoose.model('Posts', PostSchema)