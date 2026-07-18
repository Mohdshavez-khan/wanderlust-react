const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("../models/listing");

main()
    .then(()=> {
        console.log("connected to db");
    })
    .catch ((err) => {
        console.log(err)
    });

async  function main() {
    mongoose.connect("mongodb://localhost:27017/Pwanderlust")
};

const initDb = async() => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({
        ...obj,
        owner : new mongoose.Types.ObjectId("6a40b662540e52f78613a84d"),
        category  : "beach"
    }))
    await Listing.insertMany(initData.data);
    console.log("data initalised")
};

initDb()


