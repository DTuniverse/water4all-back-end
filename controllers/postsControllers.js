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
  const { title, lat, lng, creator, description, address, user_id, verified } = req.body;
  let emptyFields = [];
  if (!title) {
    emptyFields.push("title");
  }
  if (!lat) {
    emptyFields.push("lat");
  }
  if (!lng) {
    emptyFields.push("lng");
  }
  if (!creator) {
    emptyFields.push("creator");
  }
  if (!description) {
    emptyFields.push("description");
  }
  if (!address) {
    emptyFields.push("address");
  }
  if (!user_id) {
    emptyFields.push("user_id");
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: "Please fill all fields" });
  }
  try {
    const post = await Post.create({
      title,
      lat,
      lng,
      creator,
      description,
      address,
      user_id,
      verified,
    });
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
