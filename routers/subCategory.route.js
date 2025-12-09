import { Router } from "express";
import subCategoryController from "../controllers/subCategory.controller.js";
import upload from "../middlewares/imageUpload.js";

const subCategoryRouter = Router();

// Add Sub Category
subCategoryRouter.get('/add-subCategory',subCategoryController.addSubCategoryPage);
subCategoryRouter.post('/add-subCategory',upload,subCategoryController.addSubCategory);

// View Sub Category
subCategoryRouter.get('/view-subCategory',subCategoryController.viewSubCategoryPage);

// Delete Sub Category
subCategoryRouter.get('/SubCategory/delete/:id',subCategoryController.deleteSubCategory);

// Edit Sub Category
subCategoryRouter.get('/SubCategory/edit/:id',subCategoryController.editSubCategoryPage);
subCategoryRouter.post('/SubCategory/edit/:id',upload,subCategoryController.editSubCategory);

export default subCategoryRouter;