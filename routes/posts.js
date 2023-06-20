const express = require("express");

const { getAllPosts, createPost } = require("../controllers/postsControllers");

const app = express.Router();

const requireAuth = require("../middlewares/requireAuth");

app.route("/").get(getAllPosts);

app.use(requireAuth);

app.route("/").post(createPost);

module.exports = app;
