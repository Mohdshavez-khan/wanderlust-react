const Joi = require('joi');

module.exports.listingSchema = Joi.object({
    listing : Joi.object({
        title : Joi.string().required(),
        description: Joi.string().required(),
        location : Joi.string().required(),
        country : Joi.string().required(),
        price : Joi.number().min(0).required(),
        category: Joi.string().valid(
            "beach", "mountain", "villas", "forest", "luxury", "farm", "pool", "room", "camping", "arctic" , "island"
        ),
        image : Joi.object({
            url : Joi.string().allow("" , null),
            filename : Joi.string().allow("" , null)
        })
    }).required()
});

module.exports.reviewSchema = Joi.object({
   review : Joi.object({
    rating : Joi.number().min(1).max(5).required(),
    comment : Joi.string().required()
   }).required()
});

module.exports.userSchema = Joi.object({
    user : Joi.object({
       username : Joi.string().required(),
       email : Joi.string().email().required(),
       password : Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
    }).required()
})
