import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    image : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    }
})

const CategoryModel = mongoose.model('categoryModel',categorySchema);

export default CategoryModel;