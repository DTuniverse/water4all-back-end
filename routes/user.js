const express = require("express");

const { loginUser, signUpUser } = require("../controllers/userControllers");

const app = express.Router();

//Login
app.post("/login", loginUser);

//Signup
app.post("/signup", signUpUser);

module.exports = app;
