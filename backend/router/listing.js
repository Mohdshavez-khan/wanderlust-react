const express = require("express")
const router = express.Router();
const Listing = require("../models/listing");
const ExpressError = require("../utils/expressError");
const wrapAsync = require("../utils/wrapAsync");
const { validateListing, verifyToken, isOwner } = require("../middleware");
const Review = require("../models/review");
const path = require("path")
const multer = require('multer');
const { storage } = require("../cloudConfig");
const upload = multer({ storage });
const listingController = require("../controller/listingController");

router.route("/")
    .get(wrapAsync(listingController.index))
    .post(verifyToken, upload.single("image"), validateListing, wrapAsync(listingController.create));


router.get("/search", wrapAsync(listingController.searchListing));

router.route("/:id")
    .get(wrapAsync(listingController.show))
    .put(verifyToken, isOwner, upload.single("image") ,validateListing, wrapAsync(listingController.update));


//edit route
router.get("/:id/edit", verifyToken, wrapAsync(listingController.edit));


//delte route
router.delete("/:id/delete", verifyToken, isOwner, wrapAsync(listingController.destroy))


module.exports = router;