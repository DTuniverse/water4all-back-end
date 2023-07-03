const express = require("express");

const { getAllOrders, createOrder } = require("../controllers/orderController");

const app = express.Router();

const requireAuth = require("../middlewares/requireAuth");

app.route("/").get(getAllOrders);

// app.use(requireAuth);

app.route("/").post(createOrder);

module.exports = app;
