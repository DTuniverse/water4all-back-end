const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./dbinit");
const userRoutes = require("./routes/user");
const postsRoute = require("./routes/posts");
const imageRoute = require("./routes/image");
const orderRoute = require("./routes/order");

const PORT = process.env.PORT;

connectDB();

// Necessary middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));



app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.get("/", (req, res) => {
  res.send("WATER4ALL");
});

app.use("/user", userRoutes);
app.use("/posts", postsRoute);
app.use("/api", imageRoute);
app.use("/order", orderRoute);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
