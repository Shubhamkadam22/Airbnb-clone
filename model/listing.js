const mongoose = require ('mongoose');
const Schema = mongoose.Schema; 

const listingSchema = new Schema({

    title: {
        type: String, 

    },
    description: {
        type: String,
    },
   image: {
  filename: {
    type: String,
    default: "listingimage",
  },
  url: {
    type: String,
    default: "https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    set: (v) => v === "" ? "https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60" : v,
  },
}, 
    price: {
        type: Number, 
    },
    location: {
        type: String, 
    },
    country: {
        type: String,
    }
});

const listings = mongoose.model('listing', listingSchema);

module.exports = listings;

