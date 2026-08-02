const express = require('express');                                  //import express module

const app = express();                                              //create an instance of express
const listing = require('./model/listing.js');                      //import the listing model
const mongoose = require('mongoose');                               //import mongoose module
const MONGO_URL = 'mongodb://127.0.0.1:27017/Wonderlust';           //set the MongoDB connection URL
const Listing = require("./model/listing.js");                     //import the listing model
const path = require('path');                                      //import path module

//import method-override module to support PUT and DELETE methods in forms

const methodOverride = require('method-override');
app.use(methodOverride('_method'));


// set up the view engine and views directory
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//middleware to parse incoming request bodies
app.use(express.urlencoded({ extended: true }));


//database connection

async function main(){
    await mongoose.connect(MONGO_URL);
}

main().then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

 //port to run the server

app.listen(3000, () => {
    console.log('Server is running on port 3000');
    
});

//main page route

app.get('/', (req, res) => {
    res.send('hello root');
});

//Index route 

app.get("/listings", async (req, res) => {
  const allListings = await listing.find({});
  res.render("listings/index.ejs", { listings: allListings });
});

//New Route 

app.get("/listings/new" , (req , res) => {
 res.render("listings/new.ejs");

}); 


//Show route 

app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });
});


// create route 

app.post("/listings", async (req, res) => {
const newlisting = new Listing(req.body.listing);
await newlisting.save();
res.redirect("/listings");
});



//Edit route 

app.get("/listings/:id/edit", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
});

//Update route

app.put("/listings/:id", async (req, res) => {
    let { id } = req.params;
    const updatedListing = await Listing.findByIdAndUpdate(id, req.body.listing, { new: true });
    res.redirect(`/listings/${id}`);
});

//Delete route 

app.delete("/listings/:id", async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
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

