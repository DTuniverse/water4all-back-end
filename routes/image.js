const express = require('express');
const upload = require('../upload');
const app = express.Router();
const { getImage, uploadImage } = require('../controllers/imageControllers');
const requireAuth = require("../middlewares/requireAuth");

app.use(requireAuth);
app.get('/image', getImage);
app.post('/upload', upload.single('picture'), uploadImage);
//frontend field must be called also "picture"

module.exports = app