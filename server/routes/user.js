const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { hashPassword, comparePassword } = require("../db/bcrypt");
// const auth = require('../middleware/auth');
require("dotenv").config();

router.use(cookieParser());

router.post("/signup", async (req, res) => {
  // console.log("SIGNUP : ", req.body);
  let input = {
    email: req.body.email,
    password: await hashPassword(req.body.password),
  };
  const new_user = new User(input);
  console.log("new_user : ", new_user);

  try {
    const is_present = await User.exists({ email: new_user.email });
    if (!is_present) {
      await new_user.save();
      res
        .status(200)
        .json({ msg: `${new_user.email} is created successfully` });
    } else {
      res.status(409).json({ msg: `${new_user.email} account already exists` });
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/login", async (req, res) => {
  console.log("LOGIN : ", req.body);
  const { email, password } = req.body;
  try {
    // const loggedInUser = await User.findByCredentials(req.body);
    const loggedInUser = await User.findOne({ email });

    if (
      loggedInUser &&
      (await comparePassword(password, loggedInUser.password))
    ) {
      const userObject = loggedInUser.toObject();
      delete userObject.password;

      const accessToken = await jwt.sign(
        { _id: loggedInUser._id },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRES_IN,
        }
      );

      const options = {
        httpOnly: true,
        secure: true,
      };

      res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .json({ loggedInUser: userObject, accessToken });
    } else
      res.status(400).json({
        msg: "Unable to login, either email or password is wrongly typed",
      });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("accessToken");
  res.status(200).json({ message: "Logout successful" });
});

module.exports = router;
