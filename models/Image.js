const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    url: { type: String },
});

module.exports = mongoose.model("image", ImageSchema);