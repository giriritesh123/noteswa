const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchUser");

const JWT_SECRET = "Ajeet$is$awesome$web$developer";

//Route1:Create a User using:POST  "/api/auth/createuser".No login required
router.post(
  "/createuser",
  [
    body("name", "Please enter a valid name.").isLength({ min: 3 }),
    body("email", "Please enter a valid email.").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success = false;
    //If there are errors return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //we used try/catch for better error handling
    try {
      //check if the user with this email exists already
      let user = await User.findOne({ email: req.body.email });
      console.log(user);
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry, the user with this email already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      //creating a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      //niche authToken: authToken ye likhte to bhi chal jata
      success = true;
      res.json({ success, authToken });
      console.log(req.body);
    } catch (error) {
      //error handling
      console.error(error.message);
      res.status(500).send("Some error occurred");
    }
  }
);

//Route2:Authenticate a User using:POST  "/api/auth/login".No login required
router.post(
  "/login",
  [
    body("email", "Please enter a valid email.").isEmail(),
    body("password", "Password cannot be blank.").exists(),
  ],
  async (req, res) => {
    let success = false;
    //If there are errors return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email: email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      //error handling
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//Route3:Get logged in user details using:POST  "/api/auth/getuser".Login required
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {}
});
module.exports = router;

//in try and catch:first the piece of code in try executes if some error occurs during execution of try the remaining lines of code in try doesn't executes and the code inside the catch section executes
