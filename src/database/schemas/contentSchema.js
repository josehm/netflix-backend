const mongoose = require('mongoose');

const schema = mongoose.Schema;

const contentSchema = new schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  releaseDate: {
    type: String,
    required: true
  },
  imgHero: {
    type: String,
    required: true
  },
  genres: [{
    type: schema.Types.ObjectId,
    ref: 'genres'
  }],
  clasaification: {
    type: String
  },
  overViewLink: {
    type: String
  },
  medias: [{
    type: schema.Types.ObjectId,
    ref: 'media'
  }],
  categories: [{
    type: schema.Types.ObjectId,
    ref: 'categories'
  }],
  tags: [{
    type: schema.Types.ObjectId,
    ref: 'tags'
  }]
}, 
{timestamps:true} )

mongoose.Types.ObjectId.prototype.valueOf = function() {
  return this.toString()
}

module.exports = contentSchema