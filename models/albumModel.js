const mongoose = require("mongoose")
require('mongoose-type-url')

const albumSchema = new mongoose.Schema({
  title: {
    type: String,
    require: [true, "Album must have a title"]
  },
  artist: {
    type: String,
    require: [true, 'User must have a username'],
  },
  image: {
    type: mongoose.SchemaTypes.Url,
    require: false
  },
  listened: {
    type: Boolean,
    require: true,
    default: false
  }
}, {
  timestamps: true
});

const Album = mongoose.model("Album", albumSchema);

module.exports = Album;
