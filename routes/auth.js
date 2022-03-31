const router = require("express").Router();
const User = require("../models/User");

const bcrypt = require("bcrypt");
// Register API
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      fullname: req.body.fullname,
      username: req.body.username,
      telephone: req.body.telephone,
      email: req.body.email,
      password: hashPass,
    });
    const user = await newUser.save();
    console.log(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login API
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(400).json("Wrong E-mail");
    const validated = await bcrypt.compare(req.body.password, user.password);
    !validated && res.status(422).json("Incorrect Password");
    const { password, ...others } = user._doc; // Because we not sending password
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
