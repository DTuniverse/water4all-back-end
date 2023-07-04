const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  comments: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
  },
});
module.exports = mongoose.model("Order", orderSchema);
