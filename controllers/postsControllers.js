const Post = require("../models/Posts");

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    if (!posts.length) {
      res.status(200).json({ message: "No posts found" });
    } else {
      res.status(200).json({ data: posts });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};
// const getAllPosts = async (req, res) => {
//   try {
//     const user_id = req.user._id;
//     const posts = await Post.find({ user_id });
//     res.status(200).json(posts);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

const createPost = async (req, res) => {
  const { lat, lng, color, text } = req.body;
  let emptyFields = [];
  if (!lat) {
    emptyFields.push("lat");
  }
  if (!lng) {
    emptyFields.push("lng");
  }
  if (!color) {
    emptyFields.push("color");
  }
  if (!text) {
    emptyFields.push("text");
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: "Please fill all fields" });
  }
  try {
    const post = await Post.create({ lat, lng, color, text });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// const createPost = async (req, res) => {
//   const { title, body } = req.body;

//   let emptyFields = [];

//   if (!title) {
//     emptyFields.push("title");
//   }
//   if (!body) {
//     emptyFields.push("body");
//   }

//   if (emptyFields.length > 0) {
//     return res.status(400).json({ error: "Please fill all fields" });
//   }

//   try {
//     const user_id = req.user._id;
//     const post = await Post.create({ title, body, user_id });
//     res.status(201).json(post);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

module.exports = { getAllPosts, createPost };
