if(process.env.NODE_ENV != "production") {
    require('dotenv').config()
}
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ExpressError = require("./utils/expressError");
const listingRouter = require("./router/listing");
const reviewRouter = require("./router/review");
const userRouter = require("./router/user");
const wishlistRouter = require("./router/wishlist");
const cors = require("cors");
const path = require("path");

main()
    .then(()=> {
        console.log("connected to db");
    })
    .catch ((err) => {
        console.log(err)
    });

async  function main() {
    await mongoose.connect(process.env.MONGO_URL);
};


app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.get("/" , (req , res) => {
    res.json({ message : "Backend is running successfully"});
})

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);
app.use("/wishlist", wishlistRouter);


app.use((req , res , next) => {
    console.log("404 route:" , req.method, req.originalUrl);
    next(new ExpressError(404 , "page not Found"))
});

app.use((err , req , res , next) => {
    console.log(err)
    let { statusCode = 500 , message = "somthing went wrong"} = err;
    res.status(statusCode).json({message});
   
});

app.listen(8080 , (req , res) =>{
    console.log("app is listning on port 8080")
});