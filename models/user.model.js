import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        required : true,
        unique : true,
        type : String
    },
    email : {
        required : true,
        unique : true,
        type : String,
        lowercase : true
    },
    password : {
        required : true,
        type : String
    },
    image :{
        type : String
    },
    bio : {
        type : String
    },
    gender : {
        type : String 
    },
    location : {
        type : String
    },
    
})

const UserModel = mongoose.model('userModel',userSchema);

export default UserModel;
