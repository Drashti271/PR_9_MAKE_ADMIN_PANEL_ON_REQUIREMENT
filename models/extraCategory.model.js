import mongoose from "mongoose";

const extraCategorySchema = new mongoose.Schema({
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
    },
    subcategory : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'subcategoryModel',
        required : true
    }
})

const ExtraCategoryModel = mongoose.model('extraCategoryModel',extraCategorySchema);

export default ExtraCategoryModel;