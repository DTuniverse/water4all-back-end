const express = require("express");

const { getAllPosts, createPost } = require("../controllers/postsControllers");

const app = express.Router();

const requireAuth = require("../middlewares/requireAuth");

app.use(requireAuth);

app.route("/").get(getAllPosts).post(createPost);

module.exports = app;
