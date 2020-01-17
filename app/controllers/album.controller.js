const Album = require('../models/album.model.js');

// Create and Save a new album
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    return res.status(400).send({
      message: "Album title can not be empty"
    });
  }

  if (!req.body.artist) {
    return res.status(400).send({
      message: "Album artist can not be empty"
    });
  }

  if (!req.body.image) {
    return res.status(400).send({
      message: "Album image can not be empty"
    });
  }

  // Create an album
  const album = new Album({
    title: req.body.title,
    artist: req.body.artist,
    image: req.body.image,
    listened: false
  });

  // Save Album in the database
  album.save().then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occured while creating the Album"
    });
  });
};

// Retrieve and return all albums from the database
exports.findAll = (req, res) => {
  // Retrieve and return all albums from the database
  Album.find({ listened: req.params.listened }).then(albums => {
    res.send(albums);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occured while retrieving the albums"
    })
  })
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
  // Find note and update it with the request body
  Album.findOneAndUpdate({title: req.params.title}, {
      listened: true
  }, {new: true})
  .then(album => {
      if(!album) {
          return res.status(404).send({
              message: "Album not found with title " + req.params.title
          });
      }
      res.send(album);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "Album not found with title " + req.params.title
          });                
      }
      return res.status(500).send({
          message: "Error updating album with title " + req.params.title
      });
  });
};



// Delete an album with the specified title in the request
exports.delete = (req, res) => {
  Album.findOneAndDelete({
    title: req.params.title
  }).then(album => {
    if (!album) {
      return res.status(404).send({
        message: "Album not found with title " + req.params.title
      });
    } 
    res.send({message: "Album deleted successfully!"});
  }).catch(err => {
    if (err.kind === "ObjectId" || err.name === "NotFound") {
      return res.status(404).send({
        mesasge: "Album not found with title " + req.params.title
      });
    }
    return res.status(500).send({
      message: "Could not delete album with title " + req.params.title
    })
  })
}