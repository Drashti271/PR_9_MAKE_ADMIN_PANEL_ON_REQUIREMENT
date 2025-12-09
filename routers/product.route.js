import { Router } from "express";
import productController from "../controllers/product.controller.js";
import upload from "../middlewares/imageUpload.js";

const productRouter = Router();

// Add Product
productRouter.get('/add-product',productController.addproductPage);
productRouter.post('/add-product',upload,productController.addproduct);

// View Product
productRouter.get('/view-product',productController.viewproductPage);

// Delete Product
productRouter.get('/product/delete/:id',productController.deleteproduct);

// Edit Product
productRouter.get('/product/edit/:id',productController.editproductPage);
productRouter.post('/product/edit/:id',upload,productController.editproduct);

productRouter.get('/product/view/:id', productController.productDetails);

export default productRouter;