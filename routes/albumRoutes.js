const express = require('express')

const albumController = require("../controllers/albumController.js")
const router = express.Router()

router.route("/addAlbum").post(albumController.addAlbum);
router.route("/deleteAlbum").delete(albumController.deleteAlbum);
router.route("/deleteAll").delete(albumController.deleteAll);
router.route("/getAlbums").get(albumController.getAlbums);
router.route("/updateAlbumStatus").patch(albumController.updateAlbumStatus);

module.exports = router;
