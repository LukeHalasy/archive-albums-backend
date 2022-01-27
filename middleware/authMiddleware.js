const protect = (req, res, next) => {
  console.log("in middleware: " + req.query.listened);
  const {user} = req.session

  if (!user) {
    return res.status(401).json({status: 'fail', message: 'unauthorized'})
  }

  req.user = user

  next()
}

module.exports = protect;
