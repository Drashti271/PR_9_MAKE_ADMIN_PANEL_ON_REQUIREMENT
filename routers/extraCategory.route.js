import { Router } from "express";
import extraCategoryController from "../controllers/extraCategory.controller.js";
import upload from "../middlewares/imageUpload.js";

const extraCategoryRouter = Router();

// Add extra Category
extraCategoryRouter.get('/add-extraCategory',extraCategoryController.addextraCategoryPage);
extraCategoryRouter.post('/add-extraCategory',upload,extraCategoryController.addextraCategory);

// View extra Category
extraCategoryRouter.get('/view-extraCategory',extraCategoryController.viewextraCategoryPage);

// Delete extra Category
extraCategoryRouter.get('/ExtraCategory/delete/:id',extraCategoryController.deleteextraCategory);

// Edit extra Category
extraCategoryRouter.get('/ExtraCategory/edit/:id',extraCategoryController.editextraCategoryPage);
extraCategoryRouter.post('/ExtraCategory/edit/:id',upload,extraCategoryController.editextraCategory);

export default extraCategoryRouter;