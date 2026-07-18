const express = require("express")
const router = express.Router({mergeParams  : true});
const Review = require("../models/review");
const wrapAsync = require("../utils/wrapAsync");
const Listing = require("../models/listing");
const {validateReview , verifyToken , isReviewAuthor} = require("../middleware");
const reviewController = require("../controller/reviewController");

router.post("/", verifyToken , validateReview ,  wrapAsync(reviewController.createReview));

router.delete("/:reviewId", verifyToken, isReviewAuthor  ,reviewController.destroyReview )


module.exports = router;