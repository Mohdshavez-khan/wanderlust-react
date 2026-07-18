const User = require("../models/user")

module.exports.index = async(req , res) => {
    const user = await User.findById(req.user.id).populate("wishlist")
    res.json(user.wishlist)
};

module.exports.toggleWishlist = async(req , res) => {
    const {listingId} = req.params;
    const user = await User.findById(req.user.id);
    const allreadyExists = user.wishlist.includes(listingId)
    if(allreadyExists) {
        user.wishlist.pull(listingId)
     
    } else{
        user.wishlist.push(listingId);
    };

    await user.save();
    res.json({
        success : true,
        wishlisted : !allreadyExists,
        wishlist : user.wishlist
    })
};