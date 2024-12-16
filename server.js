const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost/truthweb-community', { useNewUrlParser: true, useUnifiedTopology: true });

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String
});

const Post = mongoose.model('Post', postSchema);

app.use(express.json());

app.get('/posts', async (req, res) => {
  const posts = await Post.find().exec();
  res.json(posts);
});

app.post('/posts', async (req, res) => {
  const post = new Post(req.body);
  await post.save();
  res.json(post);
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
