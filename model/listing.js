const mongoose = require ('mongoose');
const Schema = mongoose.Schema; 

const listingSchema = new Schema({

    title: {
        type: String, required: true

    },
    description: {
        type: String, required: true
    },
    image: {
        type: String, 
        set: (v) => v=== "" ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlTjYXe2rPOMMzm_bfDU-iiROm5mpSnuPfTg&s" : v,  // using this set method we can set a default parameter for input from user
    },
    price: {
        type: Number, required: true
    },
    location: {
        type: String, required: true
    },
    country: {
        type: String,
    }
});

const listing = mongoose.model('listing', listingSchema);

module.exports = listing;