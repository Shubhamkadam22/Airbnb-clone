const express = require('express');

const app = express();  
const listing = require('./model/listing.js');
const mongoose = require('mongoose');
const MONGO_URL = 'mongodb://127.0.0.1:27017/Wonderlust';
const Listing = require("./model/listing.js");
const path = require('path');

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

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

