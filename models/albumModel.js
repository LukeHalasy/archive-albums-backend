const mongoose = require("mongoose")
require('mongoose-type-url')

const albumSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Album must have a name"]
  },
  artist: {
    type: String,
    required: [true, 'Album must have an artist'],
  },
  image: {
    type: mongoose.SchemaTypes.Url,
    required: [true, 'Album must have an image']
  }
}, {
  timestamps: true
});

const Album = mongoose.model("Album", albumSchema);

module.exports = Album;
