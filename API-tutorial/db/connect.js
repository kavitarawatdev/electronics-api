const mongoose=require("mongoose");

const connectDB=(uri)=>{
    console.log("connect db");
    return mongoose.connect(uri)//uri, options, callback
}

module.exports=connectDB;