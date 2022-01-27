const Album = require("../models/albumModel")

const bcrypt = require("bcryptjs")

exports.addAlbum = async(req, res) => {
  /*
  const {title, artist, image, listened} = req.body;
  */
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

exports.deleteAlbum = async(req, res) => {
  try {
    res.status(201).json({
      status: 'success',
      data: {
        user: newUser
      }
    })
  } catch(e) {
    console.log(e)
    res.status(400).json({
      status: 'fail'
    })
  }
}

exports.deleteAll = async(req, res) => {
  try {
    res.status(200).json({status: 'success'})
  } catch(e) {
    res.status(400).json({
      status: 'fail'
    })
  }
}


exports.getAlbums = async(req, res) => {
  try {
    res.status(200).json({
      status: 'success'
    })
  } catch(e) {
    res.status(400).json({
      status: 'fail'
    })
  }
}


exports.updateAlbumStatus = async(req, res) => {
  try {
    res.status(200).json({
        status: 'success'
    })   
  } catch(e) {
    res.status(400).json({
      status: 'fail'
    })
  }
}
