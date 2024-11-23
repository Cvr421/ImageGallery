const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    try {
      const emailPresent = await User.findOne({ email: req.body.email });
      if (emailPresent) {
        return res.status(400).send("Email already exists");
      }
      const hashedPass = await bcrypt.hash(req.body.password, 10);
      const user = await User({ ...req.body, password: hashedPass });
      const result = await user.save();
      if (!result) {
        return res.status(500).send("Unable to register user");
      }
      return res.status(201).send("User registered successfully");
    } catch (error) {
      res.status(500).send("Unable to register user");
    }
  };

  const getuser = async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select("-password");
      return res.send(user);
    } catch (error) {
      res.status(500).send("Unable to get user");
    }
  };

  const login = async (req, res) => {
    try {
      const emailPresent = await User.findOne({ email: req.body.email });
      if (!emailPresent) {
        return res.status(400).send("Incorrect credentials");
      }
      const verifyPass = await bcrypt.compare(
        req.body.password,
        emailPresent.password
      );
      if (!verifyPass) {
        return res.status(400).send("Incorrect credentials");
      }
      const token = jwt.sign(
        { userId: emailPresent._id, isAdmin: emailPresent.isAdmin },
        process.env.JWT_SECRET,
        {
          expiresIn: "2 days",
        }
      );



      
      return res.status(201).send({ msg: "User logged in successfully",token });
    } catch (error) {
      res.status(500).send("Unable to login user");
    }
  };

  module.exports = {
  
    login,
    register,
    getuser,
  } 