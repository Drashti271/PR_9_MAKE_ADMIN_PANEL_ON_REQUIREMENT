import { Router } from "express";
import categoryController from "../controllers/category.controller.js";
import upload from "../middlewares/imageUpload.js";

const categoryRouter = Router();

// Add Category
categoryRouter.get('/add-category',categoryController.addCategoryPage);
categoryRouter.post('/add-category',upload,categoryController.addCategory);

// View Category 
categoryRouter.get('/view-category',categoryController.viewCategorypage);

// Delete Category
categoryRouter.get('/category/delete/:id',categoryController.deleteCategory);

// Edit Category
categoryRouter.get('/category/edit/:id',categoryController.editCategoryPage);
categoryRouter.post('/category/edit/:id',upload,categoryController.editCategory);

export default categoryRouter;