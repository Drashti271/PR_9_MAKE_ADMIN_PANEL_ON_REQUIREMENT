import { Router } from "express";
import adminRouter from "./admin.route.js";
import categoryRouter from "./category.route.js";
import flashMsg from "../middlewares/flashMsg.js";
import userAuth from "../middlewares/userAuth.js";
import subCategoryRouter from "./subCategory.route.js";
import extraCategoryRouter from "./extraCategory.route.js";
import productRouter from "./product.route.js";
// import reviewRoute from "./reviewRoute.route.js";

const router = Router();

router.use('/',flashMsg,adminRouter);
router.use('/',userAuth,categoryRouter);
router.use('/',userAuth,subCategoryRouter);
router.use('/',userAuth,extraCategoryRouter);
router.use('/',userAuth,productRouter);
// router.use('/',userAuth,reviewRoute);

export default router;
