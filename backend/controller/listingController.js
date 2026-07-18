const Listing = require("../models/listing");
const Review = require("../models/review");
const User = require("../models/user");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding")
const mapToken = process.env.MAP_TOKEN;

const geocodingClint = mbxGeocoding({ accessToken: mapToken })

module.exports.index = async (req, res) => {
    const { category } = req.query;
    let query = {};
    if (category) {
        query.category = category;
    }
    let listings = await Listing.find(query);

    if (!listings) {
        throw new ExpressError(404, "listings not found")
    };

    res.json(listings);
};

module.exports.show = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id).populate({
        path: "reviews", populate: {
            path: "author"
        }
    }).populate("owner");
    if (!listing) {
        throw new ExpressError(404, "listing not found")
    }
    res.json(listing)
};


module.exports.create = async (req, res) => {
    const newListing = new Listing(req.body.listing);
    if (req.file) {
        newListing.image = {
            filename: req.file.filename,
            url: req.file.path
        }
    };

    let response = await geocodingClint.forwardGeocode({
        query: req.body.listing.location,
        limit: 1
    })
        .send();
    newListing.geometry = response.body.features[0].geometry;
    newListing.owner = req.user.id;
    await newListing.save();
    res.status(201).json(newListing)
};


module.exports.edit = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        throw new ExpressError(404, "listings not found")
    }

    res.json(listing)
}

module.exports.update = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    if (typeof req.file != "undefined") {
        listing.image = {
            url: req.file.path,
            filename: req.file.filename,
        }
    };
    let response = await geocodingClint.forwardGeocode({
        query: req.body.listing.location,
        limit: 1
    })
        .send();
    listing.geometry = response.body.features[0].geometry;

    if (!listing) {
        throw new ExpressError(404, "listings not found")
    };
    await listing.save();
    res.json(listing);
};

module.exports.destroy = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndDelete(id);
    if (!listing) {
        throw new ExpressError(404, "listings not found")
    }
    res.json(listing);
};

module.exports.searchListing = async (req, res) => {
    const { q } = req.query;
    const listings = await Listing.find({
        $or: [
            {
                title: {
                    $regex: q,
                    $options: "i"
                },
            },
            {
                location: {
                    $regex: q,
                    $options: "i"
                },
            },
            {
                country: {
                    $regex: q,
                    $options: "i"
                }
            }
        ]
    });
    res.json(listings)
};
