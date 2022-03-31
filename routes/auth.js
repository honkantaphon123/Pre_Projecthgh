const router = require("express").Router();
const User = require("../models/User");

// Register API
router.post("/register", async (req, res) => {
  try {
   
    const newUser = new User({
      fullname: req.body.fullname,
      username: req.body.username,
      telephone: req.body.telephone,
      email: req.body.email,
      password: req.body.password,
    });
    const user = await newUser.save();
    console.log(user);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login API
router.post('/login', async (req,res) => {
    try{
      const user = await User.findOne({ username: req.body.username })
      !user && res.status(400).json("Wrong Credentials");
      const validated = await compare(req.body.password, user.password)
      validated && res.status (422).json("Incorrect Password")
      const { password, ...others } = user._doc;// Because we not sending password
      res.status(200).json(others);
    } catch(err){
     res.status(500).json(err);
    }
 });
module.exports = router;
