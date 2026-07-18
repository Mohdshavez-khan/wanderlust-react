const Listing = require("./models/listing");
const Review = require("./models/review");
const { listingSchema, reviewSchema , userSchema} = require("./schema");
const ExpressError = require("./utils/expressError");
const jwt = require("jsonwebtoken")

module.exports.validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg)
    }
    next();
};

module.exports.validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg)
    }
    next();
};

module.exports.validateUser = (req , res , next) =>{
    console.log(req.body)
    let {error} = userSchema.validate(req.body);
    if(error) {
        let errMsg = error.details.map((el)=> el.message).join(",");
                console.log(errMsg)
        throw new ExpressError(400 , errMsg)

        return;
    };
    next();
};


module.exports.verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({
                message: "no token provided"
            });
        };
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        req.user = decoded;
        next();
    } catch (err) {
        console.log(err.message)
        return res.status(401).json({
            message: "invalid or Expired token"
        })
    };

};

module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing.owner.equals(req.user.id)) {
        return res.status(403).json({
            message: "You are not the owner of the listing"
        })
    };
    next()
};

module.exports.isReviewAuthor = async (req, res, next) => {
    let { id, reviewId } = req.params;
    let review = await Review.findById(reviewId);
    console.log("destroy review:" , review)
    if (!review.author.equals(req.user.id)) {
       return res.status(403).json({
            message: "you are the owner of the review"
        })
    }
    next()
};

