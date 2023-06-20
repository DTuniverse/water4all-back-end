const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  lat: {
    type: String,
    required: true,
  },
  lng: {
    type: String,
    required: true,
  },
  color: {
    type: String,
  },
  text: {
    type: String,
  },
  // user_id: {
  //   type: String,
  //   required: true,
  // },
});
// const postSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   body: {
//     type: String,
//     required: true,
//   },
//   user_id: {
//     type: String,
//     required: true,
//   },
// });
module.exports = mongoose.model("Posts", postSchema);
