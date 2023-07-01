const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  lat: {
    type: Number,
  },
  lng: {
    type: Number,
  },
  creator: {
    type: String,
  },
  description: {
    type: String,
  },
  address:{
    type: String,
  },
  user_id: {
    type: String,
  },
  url:{
    type: String,
  },
  verified: {
    type: Boolean,
    default: false
  },
});
module.exports = mongoose.model("Posts", postSchema);
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

// lat: {
//   type: String,
//   required: true,
// },
// lng: {
//   type: String,
//   required: true,
// },
// color: {
//   type: String,
// },
// text: {
//   type: String,
// },
// user_id: {
//   type: String,
//   required: true,
// },
