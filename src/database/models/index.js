const mongoose = require('mongoose');

const userSchema = require('../schemas/userSchema');
const categorySchema = require('../schemas/categorySchema');
const contentSchema = require('../schemas/contentSchema');
const mediaSchema = require('../schemas/mediaSchema');
const tagSchema = require('../schemas/tagSchema');

const UserModel = mongoose.model('user', userSchema);
const CategoryModel = mongoose.model('category', categorySchema);
const ContentModel = mongoose.model('content', contentSchema);
const MediaModel = mongoose.model('media', mediaSchema);
const TagModel = mongoose.model('tag', tagSchema);

module.exports = { 
    UserModel,
    CategoryModel,
    ContentModel,
    MediaModel,
    TagModel
};