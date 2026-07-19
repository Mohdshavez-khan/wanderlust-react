if(process.env.NODE_ENV !== "production") {
    require("dotenv").config({path : "../.env"});
};
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
    mongoose.connect(process.env.MONGO_URL);
};

const initDb = async() => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({
        ...obj,
        owner : new mongoose.Types.ObjectId("6a5c59a9a58861c41a8ca1f9"),
        category  : "beach"
    }))
    await Listing.insertMany(initData.data);
    console.log("data initalised")
};

initDb()


