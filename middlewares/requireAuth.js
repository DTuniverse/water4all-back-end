const jwt = require("jsonwebtoken");
const User = require("../models/User");

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
    const { _id } = jwt.verify(token, process.env.SECRET);

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
