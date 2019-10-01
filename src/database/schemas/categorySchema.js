const mongoose = require('mongoose');

const schema = mongoose.Schema;

const categorySchema = new schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    contents: [{
        type: schema.Types.ObjectId,
        ref: 'contents'
    }]
}, {timestamps:true} );


mongoose.Types.ObjectId.prototype.valueOf = function() {
    return this.toString();
}

module.exports = categorySchema;