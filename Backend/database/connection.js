const {MongoClient}  = require("mongodb")
const mongoose=require("mongoose")

require("dotenv").config();

const client=mongoose
.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
})
.then(()=>{
    console.log("DB connnected")

})
.catch((error) => {
    console.log("Error: ", error);

    return error;
  });

module.exports = client;