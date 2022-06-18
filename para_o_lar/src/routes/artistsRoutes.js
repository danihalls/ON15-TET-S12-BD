const controller = require("../controllers/artistsController")

const express = require("express");

const router = express.Router();

router.post("/new_artist", controller.createArtist);

router.get("/all", controller.findAllArtists);

router.get("/by_id/:id", controller.findById);

router.get("/by_name", controller.findByName);

router.get("/occupation", controller.findByOccupation);

router.patch("/update_item/:id", controller.updateArtistItems);

router.put("/update_all/:id", controller.updateAllArtistItems);

router.delete("/delete_by_id/:id", controller.deleteArtist);

module.exports = router