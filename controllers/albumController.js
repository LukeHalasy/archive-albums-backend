const Album = require("../models/albumModel")
const User = require("../models/userModel")
const fetch = require("node-fetch")

const bcrypt = require("bcryptjs")

exports.addAlbum = async(req, res) => {
  try {
    console.log("Req key " + req.session.user)
    // create the album 
    const album = await Album.create(req.body);
    // const user = await User.findById(req.session.user._id)
    
    await User.updateOne({ _id: req.user._id },
      { $push: { 'albums': album._id }}
    )
    // add the album to the authenticated users list
    /*console.log(req.user);
    console.log(album);
    req.user.albums.push(album._id)
    await req.user.save();
    */

    console.log(req.user.albums)

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

    const user = await User.findById(req.user._id)

    const albums = await Album.find({ _id: { $in: user.albums } });
    console.log(albums)

    res.status(200).json({
      status: 'success',
      albums: albums
    })
  } catch(e) {
    console.log(e);
    res.status(400).json({
      status: 'fail'
    })
  }
}

// uses 3rd-Party API
exports.searchAlbums = async(req, res) => {
  try {
    const response = await fetch(`http://ws.audioscrobbler.com/2.0/?method=album.search&album=${req.params.title}&limit=5&api_key=${process.env.API_KEY}&format=json`);
    console.log("Logging album search");
    console.log(response);
    const result = await response.json(); 
    console.log(result);
    const albums = result.results.albummatches.album;

    for (var i = 0; i < albums.length; i++) {
      albums[i].image = albums[i].image[2]['#text'];
    }

    res.status(200).json({
        status: 'success',
        albums: albums
    })
  } catch(e) {
    console.log(e);
    res.status(400).json({
      status: 'fail'
    })
  }
}
