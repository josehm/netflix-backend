const mongoose = require('mongoose')

const schema = mongoose.Schema

const genreSchema = new schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, {timestamps:true} )


mongoose.Types.ObjectId.prototype.valueOf = function() {
    return this.toString()
}

module.exports = genreSchema