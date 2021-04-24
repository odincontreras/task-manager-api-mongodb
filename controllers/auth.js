const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.signin = async (req, res) => {
  try {
    const {name, email, password} = req.body;
    const existingUser = await User.findOne({email});
    if(existingUser) {
      const error = new Error()
      error.status = 406;
      throw error;
    }
    const hashedPasswors = await bcrypt.hash(password, 12)
    const user = new User({
      name,
      email,
      password: hashedPasswors
    })
    const createdUser = await user.save();
    res.status(201).json({
			message: "User created!",
			user: createdUser,
		});
  } catch(err) {
    if(err.status === 406) {
      return res.status(406).json({
        message: "A user with this email already exist!"
      })
    }
    res.status(500).json({
      message: "Create user failed"
    })
  }
}

exports.login = async (req, res, next) => {
  const {email, password} = req.body;
  try {
    const user = await User.findOne({email});
    if(!user) {
      const error = new Error("A user with this email could not be found.");
      error.status = 401;
      throw error;
    }
    const rightPassword = await bcrypt.compare(password, user.password);
    if(!rightPassword) {
      const error = new Error("Wrong password, try again.");
      error.status = 401;
      throw error;
    }
    const token = jwt.sign(
      {
        email: user.email,
        id: user._id.toString(),
      },
      process.env.TOKEN_SECRET,
      {expiresIn: "12h"}
    );
    res.status(200).json({
      token,
      userId: user._id.toString(),
    });
  } catch(err) {
    next(err);
  }
}