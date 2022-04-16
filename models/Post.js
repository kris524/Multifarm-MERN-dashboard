const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    // title: {
    //     type: String,
    //     required: true,
    // },
    // description: {
    //     type: String,
    //     required: true,
    // },
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