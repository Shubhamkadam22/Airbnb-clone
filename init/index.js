const mongoose = require ('mongoose');
const initData = require("./data.js");
const listing = require("../model/listing.js");
    
const MONGO_URL = 'mongodb://127.0.0.1:27017/Wonderlust';

async function main(){
    await mongoose.connect(MONGO_URL);
}

main().
    then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));


const initDB = async () => {
    await listing.deleteMany({});
    await listing.insertMany(initData.data);

    console.log("Database initialized with sample data");
}

initDB();

