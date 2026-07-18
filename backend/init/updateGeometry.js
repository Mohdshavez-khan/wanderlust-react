 require('dotenv').config({path : "../.env"})
const mongoose = require("mongoose")
const Listing = require("../models/listing");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding")
const mapToken = process.env.MAP_TOKEN;
console.log("mapToken : " , mapToken)

const geocodingClint = mbxGeocoding({ accessToken: mapToken })
main()
    .then(() => {
        console.log("connected to db");
    })
    .catch((err) => {
        console.log(err)
    });

async function main() {
    mongoose.connect("mongodb://localhost:27017/Pwanderlust")
};

async function updateGeometry() {
    const listings = await Listing.find({});
  
    for (let listing of listings) {
        const response = await geocodingClint.forwardGeocode({
            query: listing.location,
            limit: 1
        })
            .send()

        listing.geometry = response.body.features[0].geometry;
        await listing.save()
    }
    console.log("all listings updated")
};

updateGeometry()