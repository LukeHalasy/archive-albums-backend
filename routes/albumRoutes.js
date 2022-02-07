const express = require('express')

const albumController = require("../controllers/albumController.js")
const protect = require('../middleware/authMiddleware')

const router = express.Router()

router.route("/addAlbum").post(protect, albumController.addAlbum);
router.route("/deleteAlbum/:id").delete(protect, albumController.deleteAlbum);
router.route("/deleteAll").delete(protect, albumController.deleteAll);
router.route("/getAlbums").get(protect, albumController.getAlbums);

// TODO: Change to protected
router.route("/searchAlbums/:title").get(protect, albumController.searchAlbums);

module.exports = router;
