const mongoose = require('mongoose')

const schema = mongoose.Schema

const seasonSchema = new schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    releaseDate: {
        type: String,
        required: true
    },
    order: {
        type: Number,
        required: true
    },
    contentID: {
        type: schema.Types.ObjectId,
        required: true,
    }
}, {timestamps:true} )

mongoose.Types.ObjectId.prototype.valueOf = function() {
    return this.toString()
}

module.exports = seasonSchema