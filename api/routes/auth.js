const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const Cryptojs = require("crypto-js");

// REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.data.username,
    email: req.body.data.email,
    password: Cryptojs.AES.encrypt(
      req.body.data.password,
      process.env.SECRET_KEY
    ).toString(),
  });
  console.log(newUser);
  try {
    const user = await newUser.save();
    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY,
      { expiresIn: "5d" }
    );
    res.status(201).json({ user, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    console.log(req.body.data.email);
    const user = await User.findOne({ email: req.body.data.email });
    if (!user) {
      return res.status(401).json({ message: "email doesnt exist" });
    }

    const originalPassword = Cryptojs.AES.decrypt(
      user.password,
      process.env.SECRET_KEY
    ).toString(Cryptojs.enc.Utf8);
    if (originalPassword !== req.body.data.password) {
      return res.status(401).send("password is invalid");
    }

    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY,
      { expiresIn: "5d" }
    );

    return res.status(200).json({
      // to make sure password is not going
      username: user.username,
      id: user._id,
      isAdmin: user.isAdmin,
      profilePic: user.profilePic,
      accessToken: accessToken,
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
