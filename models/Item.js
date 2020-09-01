const mongoose = require('mongoose')


const Scheme = mongoose.Schema

// Create Item-Schema
const ItemSchema = new Scheme({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Item = mongoose.model('item', ItemSchema)
