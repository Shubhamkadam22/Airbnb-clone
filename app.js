const express = require('express');

const app = express();  
const listing = require('./model/listing.js');
const mongoose = require('mongoose');
const MONGO_URL = 'mongodb://127.0.0.1:27017/Wonderlust';
const Listing = require("./model/listing.js");
const path = require('path');

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));

async function main(){
    await mongoose.connect(MONGO_URL);
}

main().then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));


app.listen(3000, () => {
    console.log('Server is running on port 3000');
    
});




app.get('/', (req, res) => {
    res.send('hello root');
});

//Index route 
app.get("/listings", async (req, res) => {
  const allListings = await listing.find({});
  res.render("index.ejs", { listings: allListings });
});


//Show route 
app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("show.ejs", { listing });
});























// app.get("/listings", (req, res) => {
//   const allListings = await Listing.find({});
//   res.render("index.ejs", {allListings}); 
// });



// app.get("/testlisting", async (req , res) => {
//  let sampleListing = new listing({
//     title: "my new villa    ",
//     description: "This is a sample listing for testing purposes.",
//     price: 100,
//     location: "Sample Location",
//     country: "Sample Country"
//  });

//  await sampleListing.save();
//  console.log(sampleListing);
//     res.send(sampleListing);
// });

