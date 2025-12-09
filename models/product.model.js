import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    image : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    price : {
        type : Number,
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
    },
    extracategory : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'extraCategoryModel',
        required : true
    }
})

const ProductModel = mongoose.model('productModel',productSchema);

export default ProductModel;