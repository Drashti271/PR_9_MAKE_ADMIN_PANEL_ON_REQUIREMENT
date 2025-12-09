import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
    image : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'categoryModel',
        required : true
    }
})

const SubCategoryModel = mongoose.model('subcategoryModel',subCategorySchema);

export default SubCategoryModel;