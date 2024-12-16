const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String
});

module.exports = mongoose.model('Post', postSchema);
