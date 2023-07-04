const Order = require("../models/Order");

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    if (!orders.length) {
      res.status(200).json({ message: "No orders found" });
    } else {
      res.status(200).json({ data: orders });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

const createOrder = async (req, res) => {
  const { firstname, lastname, email, address, comments, user_id } = req.body;
  let emptyFields = [];
  if (!firstname) {
    emptyFields.push("firstname");
  }
  if (!lastname) {
    emptyFields.push("lastname");
  }
  if (!email) {
    emptyFields.push("email");
  }
  if (!address) {
    emptyFields.push("address");
  }
  if (!comments) {
    emptyFields.push("comments");
  }
  // if (!user_id) {
  //   emptyFields.push("user_id");
  // }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: "Please fill all fields" });
  }
  try {
    const order = await Order.create({
      firstname,
      lastname,
      email,
      address,
      comments,
      user_id,
    });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllOrders, createOrder };
