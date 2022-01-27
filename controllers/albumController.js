const Album = require("../models/albumModel")
const User = require("../models/userModel")

const bcrypt = require("bcryptjs")

exports.addAlbum = async(req, res) => {
  try {
    // create the album 
    const album = await Album.create(req.body);

    // add the album to the authenticated users list
    console.log(req.user);
    req.user.albums.push(album._id)

    res.status(201).json({
      status: 'success',
      album: album
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
    const id = req.params.id
    const deletedPost = await Album.findByIdAndDelete(id)

    await User.updateOne({ _id: req.user._id },
      { $pull: { 'albums': id }}
    );

    res.status(200).json({
      status: 'success',
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
    await Album.deleteMany({ _id: { $in: req.user.albums }})

    const user = await User.findById(req.user._id)
    user.albums = []
    await user.save();

    res.status(200).json({status: 'success'})
  } catch(e) {
    console.log(e)
    res.status(400).json({
      status: 'fail'
    })
  }
}


exports.getAlbums = async(req, res) => {
  try {
    console.log(req.params)
    console.log(req.user)
    const listened = (req.query.listened) ? req.query.listened : 0; // default is not-listened
    console.log(listened);

    const albums = await Album.find({ _id: { $in: req.user.albums }, listened: listened });

    res.status(200).json({
      status: 'success',
      albums: albums
    })
  } catch(e) {
    res.status(400).json({
      status: 'fail'
    })
  }
}


exports.updateAlbumStatus = async(req, res) => {
  try {
    const album = await Album.findById(req.params.id)
    album.listened = req.query.listened;
    await album.save();

    res.status(200).json({
        status: 'success',
        album: album
    })   
  } catch(e) {
    res.status(400).json({
      status: 'fail'
    })
  }
}
