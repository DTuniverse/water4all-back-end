const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./dbinit");
const userRoutes = require("./routes/user");
const postsRoute = require("./routes/posts");

const PORT = process.env.PORT;

connectDB();

// Necessary middleware
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.get("/", (req, res) => {
  res.send("Express/JWT");
});

app.use("/user", userRoutes);
app.use("/posts", postsRoute);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
