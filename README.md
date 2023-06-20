1.  Create the basic node scaffolding

2.  Install the following packages: express, nodemon, cors, dotenv, mongoose

3.  Create a dbinit.js file, a .env file, and a .gitignore file

4.  In dbinit.js, create the mongo connection function and import it in your entry point file. Don't forget to also invoke the function

5.  Paste you mongo URI in the .env file

6.  Since we'll be sending POST requests throughout the exercise and we'll also be connecting to a backend, let's make sure we have the right middleware:
    in your entry point file, use the following middleware: app.use(cors()); app.use(express.json());

7.  To better keep an eye on things, create the following middleware:
    app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
    });

8.  Create a schema/models folder and create a file called User.js

9.  In User.js, create the schema for a user that has an email and password

```js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
```

10. ADDITIONALLY, we will create and add 2 new methods to this model: login and signup

```js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// creating a custom static method
userSchema.statics.signup = async function (email, password) {
  //validation

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }

  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  if (!validator.isEmail(email)) {
    throw Error("email is not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error(
      "Make sure to use at least 8 characters, one upper case letter, a number and a symbol"
    );
  }

  const salt = await bcrypt.genSalt(10);

  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });

  return user;
};

// static custom login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("user", userSchema);
```

11. Create a controllers folder and, inside, a file named userControllers.js

12. In userControllers.js, we create the login to login and sign up the users

```js
    const User = require("../schemas/User");
    const jwt = require("jsonwebtoken");

    const createToken = (\_id) => {
    return jwt.sign({ \_id }, process.env.SECRET, { expiresIn: "1d" });
    };

    // login user
    const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);

        //create token
        const token = createToken(user._id);

        res.status(200).json({ email, token });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
    };

    // sign up user
    const signUpUser = async (req, res) => {

        const { email, password } = req.body;

        try {
            const user = await User.signup(email, password);
            //create token
            const token = createToken(user.\_id);
            res.status(200).json({ email, token });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    module.exports = { loginUser, signUpUser };
```

13. Create a routes folder containing a file named user.js

14. In user.js, import the controllers and create 2 routes, one for login and one for signin up

```js
const express = require("express");

const { loginUser, signUpUser } = require("../controllers/userControllers");

const app = express.Router();

//Login
app.post("/login", loginUser);

//Signup
app.post("/signup", signUpUser);

module.exports = app;
```

15. Import this route in the entry point file

```js
const userRoutes = require("./routes/user");
app.use("/user", userRoutes);
```

16. Test things out using postman, you should get a response with the email and the token

17. Create a Posts.js file in the models folder and create a model with a title and a body

```js
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Post", postSchema);
```

18. In the controllers folder, create a postControllers.js file with the functions to get all the posts and create a post

```js
const Post = require("../models/Posts");

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    if (!posts.length) {
      return res.status(404).json({ message: "No posts found" });
    }
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createPost = async (req, res) => {
  const { title, body } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!body) {
    emptyFields.push("body");
  }

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: "Please fill all fields" });
  }

  try {
    const post = await Post.create({ title, body });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllPosts, createPost };
```

19. In the routes folder, create a file called posts.js and create the routing for the posts

```js
const express = require("express");

const { getAllPosts, createPost } = require("../controllers/postsControllers");

const app = express.Router();

app.route("/").get(getAllPosts).post(createPost);

module.exports = app;
```

20. Back in your entry point file, import the posts route and use it
    const postsRoute = require("./routes/posts");
    app.use("/posts", postsRoute);

21. Time to protect our posts. Create a folder called middlewares and inside of it create a file named requireAuth.js

22. Create the logic to authenticate

```js
    const jwt = require("jsonwebtoken");
    const User = require("../schemas/User");

    const requireAuth = async (req, res, next) => {
        // verify authentication
        const { authorization } = req.headers;

        if (!authorization) {
        return res.status(401).json({ error: "Not Authorized" });
        }

        // the auth in the headers is structured as follows: 'Bearer ddsades123ew21.dsaadwe23.d23d32' and we only need the second part, the token itself
        const token = authorization.split(" ")[1];

        // Verify the token and make sure it hasn't been tampered with

        try {
            const { \_id } = jwt.verify(token, process.env.SECRET);

            //attaching the user to the request here in the middleware will make it available in whatever comes after the middleware
            //use the select() method to only attach the id rather than the whole document containing email and pass and so on
            req.user = await User.findOne({ _id }).select("_id");
            next();
        } catch (error) {
            console.log(error);
            res.status(401).json({ error: "Not Authorized" });
        }
    };

    module.exports = requireAuth;
```

23. Back in the posts route, use the middleware to protect all posts. Make sure to call the middleware BEFORE the routes

24. Try things out with postman. When sending a GET request it should now say "Not Authorized". Click on "Authorization", select Bearer Token and paste in the token you get when signin in. You should now be able to see the post.
