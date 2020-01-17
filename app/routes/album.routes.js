module.exports = (app) => {
  const albums = require('../controllers/album.controller.js');

  // Create a new album
  app.post('/albums', albums.create);

  // Retrieve all albums
  app.get('/albums/:listened', albums.findAll);

  // Update an album's listened field
  app.put('/albums/:title', albums.update);

  // Delete an album with title
  app.delete('/albums/:title', albums.delete);
}