const express = require('express');

const app = express();  
const listing = require('./model/listing.js');
const mongoose = require('mongoose');
const MONGO_URL = 'mongodb://127.0.0.1:27017/Wonderlust';
mongoose.connect(MONGO_URL);

async function main(){
    await mongoose.connect(MONGO_URL);
}

main().then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));


app.listen(3000, () => {
    console.log('Server is running on port 3000');
    
});


app.get("/testlisting", async (req , res) => {
 let sampleListing = new listing({
    title: "my new villa    ",
    description: "This is a sample listing for testing purposes.",
    price: 100,
    location: "Sample Location",
    country: "Sample Country"
 });

 await sampleListing.save();
 console.log(sampleListing);
    res.send(sampleListing);
});
app.get('/', (req, res) => {
    res.send('hello root');
});