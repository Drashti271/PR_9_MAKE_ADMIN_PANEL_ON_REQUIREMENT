import mongoose from "mongoose"
import dotenv from "./dotenv.js"

const db = async()=>{
    try {        
        await mongoose.connect(dotenv.MONGO_URL);
        console.log("database connected.");
    } catch (error) {
        console.log(error.message);        
    }
}

export default db();
