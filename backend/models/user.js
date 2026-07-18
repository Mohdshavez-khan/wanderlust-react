const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
  username : String,
  email  : String,
  password : String,
  wishlist : [
    {
      type : Schema.Types.ObjectId,
      ref  : "Listing"
    }
  ]
    
});


module.exports = mongoose.model('User', userSchema);