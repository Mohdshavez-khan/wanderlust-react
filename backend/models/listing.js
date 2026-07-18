const mongoose = require("mongoose");
const review = require("./review");
const Schema = mongoose.Schema;
const Review = require("./review")

const listingSchema = new Schema({
    title : String,
    description : String,
    image : {
        url : String,
        filename : String,
    },
    price : Number,
    location : String,
    country : String,
    reviews : [
        {
            type : Schema.Types.ObjectId,
            ref : "Review"
        }
    ],
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    geometry : {
        type : {
            type : String,
            enum : ["Point"],
           
        },
        coordinates : {
            type : [Number],
          
        }
    },
    category : {
        type : String,
        enum : ["beach", "mountain", "villas", "forest", "luxury", "farm", "pool", "room", "camping", "arctic" , "island"],
        default : "beach"
    }
});

listingSchema.post("findOneAndDelete" , async(listing) => {
    if(listing) {
        await Review.deleteMany({
            _id : {$in : listing.reviews}
        })

    }
})

const Listing = mongoose.model("Listing" , listingSchema);
module.exports = Listing;

