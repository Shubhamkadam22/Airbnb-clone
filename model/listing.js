const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DEFAULT_IMAGE_URL =
  "https://plus.unsplash.com/premium_photo-1661876449499-26de7959878f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bmF0dXJlJTIwaG91c2V8ZW58MHx8MHx8fDA%3D";

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    filename: {
      type: String,
      default: "listingimage",
    },
    url: {
      type: String,
      default: DEFAULT_IMAGE_URL,
      set: (v) => (v === "" ? DEFAULT_IMAGE_URL : v),
    },
  },
  
  price: Number,
  location: String,
  country: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;