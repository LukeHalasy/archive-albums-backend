const mongoose = require("mongoose")
require('mongoose-type-url')

const albumSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Album must have a title"]
  },
  artist: {
    type: String,
    required: [true, 'User must have a username'],
  },
  image: {
    type: mongoose.SchemaTypes.Url,
    required: false
  },
  listened: {
    type: Boolean,
    required: true,
    default: false
  },
}, {
  timestamps: true
});

const Album = mongoose.model("Album", albumSchema);

module.exports = Album;
