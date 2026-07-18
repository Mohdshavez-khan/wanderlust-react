const express = require("express")
const router = express.Router();
const wishlistController = require("../controller/wishlistController");
const {verifyToken} = require("../middleware");

router.get("/" , verifyToken , wishlistController.index);

router.post("/:listingId" , verifyToken , wishlistController.toggleWishlist);

module.exports = router;