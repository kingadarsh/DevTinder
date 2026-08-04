const mongoose=require("mongoose");
const Conn_Str=process.env.MONGO_URI;

// console.log(Conn_Str)

const connectToDb=async ()=>{
    try{
        await mongoose.connect(Conn_Str);
        console.log("The connection to the database was successful");
    }
    catch(err){
        console.error("There was a problem connecting to the database")
    }   
}

module.exports=connectToDb;

