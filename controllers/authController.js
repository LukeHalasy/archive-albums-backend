const User = require("../models/userModel")

const bcrypt = require("bcryptjs")

exports.test = async(req, res) => {
  console.log("called")
  try {
    res.status(201).json({
      status: 'success',
      data: {
        result: "Yepp"
      }
    })
  } catch(e) {
    console.log(e)
    res.status(400).json({
      status: 'fail'
    })
  }
}

exports.signUp = async(req, res) => {
  console.log("Sign up, " + req.body);

  const {email, password} = req.body;

  try {
    const hashpassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      email: email,
      password: hashpassword
    })

    res.status(201).json({
      status: 'success',
      email: email
    })
  } catch(e) {
    console.log(e)
    res.status(400).json({
      status: 'fail'
    })
  }
}

exports.login = async(req, res) => {
  const {email, password} = req.body;
  console.log('email, ' + email);

  try {
    const user = await User.findOne({email})

    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'user not found'
      })
    }

    const isCorrect = await bcrypt.compare(password, user.password)

    if (isCorrect) {
      req.session.user = user;
      res.status(200).json({
        status: 'success',
        email: req.session.user.email

      })
    } else {
      res.status(400).json({
        status: 'fail',
        message: 'incorrect email or password'
      })
    }
  } catch(e) {
    console.log(e);
    res.status(400).json({
      status: 'fail'
    })
  }
}

exports.logout = async(req, res) => {
  try {
    if (req.session) {
      req.session.destroy(); 
    }

    res.status(200).json({
      status: 'success'
    })
  } catch(e) {
    console.log(e);
    res.status(400).json({
      status: 'fail'
    })
  }
}

exports.currentUser = async(req, res) => {
  console.log("Session: ", req.session);
  if (req.session.user) {
    return res.status(200).json({
      logged_in: true,
      email: req.session.user.email
    })
  } else {
    return res.status(200).json({
      logged_in: false,
      email: ''
    })
  }
}
