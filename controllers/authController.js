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
  console.log(req.body);

  const {username, password} = req.body;

  try {
    const hashpassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      username,
      password: hashpassword
    })

    res.status(201).json({
      status: 'success',
    })
  } catch(e) {
    console.log(e)
    res.status(400).json({
      status: 'fail'
    })
  }
}

exports.login = async(req, res) => {
  const {username, password} = req.body;

  try {
    const user = await User.findOne({username})

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
        username: req.session.user.username

      })
    } else {
      res.status(400).json({
        status: 'fail',
        message: 'incorrect username or password'
      })
    }
  } catch(e) {
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
    res.status(400).json({
      status: 'fail'
    })
  }
}

exports.currentUser = async(req, res) => {
  if (req.session.user) {
    return res.status(200).json({
      logged_in: true,
      username: res.session.user.username
    })
  } else {
    return res.status(200).json({
      logged_in: false
    })
  }
}
