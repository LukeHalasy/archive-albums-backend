const mongoose = require('mongoose');

const AlbumSchema = mongoose.Schema({
  title: String,
  artist: String,
  image: String,
  listened: Boolean
}, {
  timestamps: true
});

module.exports = mongoose.model('Album', AlbumSchema);