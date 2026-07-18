const Listing = require("../models/listing");
const Review = require("../models/review");

// module.exports.createReview = async (req, res) => {
//     let listing = await Listing.findById(req.params.id);
//     let review = new Review(req.body.review)
//     review.author = req.user._id;
//     let addReview = listing.reviews.push(review);
//     await listing.save();
//     await review.save()
//     req.flash("success" , "review created successfully")
//     res.redirect(`/listings/${listing._id}`)
// };

module.exports.createReview = async(req ,res) => {
    let listing = await Listing.findById(req.params.id);
    let review = new Review(req.body.review);
    let addReview = listing.reviews.push(review);
    review.author = req.user.id
    console.log(review)
    await listing.save();
    await review.save();
    res.status(201).json(review);
}

module.exports.destroyReview = async(req, res) => {
    let {id , reviewId} = req.params;
    await Listing.findByIdAndUpdate(id , {$pull : { reviews : reviewId}});
    await Review.findByIdAndDelete(reviewId);
    res.status(201).json({"message" : "review deleted"})
};