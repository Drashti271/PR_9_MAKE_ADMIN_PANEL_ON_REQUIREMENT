import { Router } from "express";
import adminController from "../controllers/admin.controller.js";
import userAuth from "../middlewares/userAuth.js";
import upload from "../middlewares/imageUpload.js";

const adminRouter = Router();

// Register User
adminRouter.get('/register',adminController.registerUserPage);
adminRouter.post('/register',adminController.registerUser);

// Login User
adminRouter.get('/login',adminController.loginUserPage);
adminRouter.post('/login',adminController.loginUser);

// Forget Password
adminRouter.post('/forget-password',adminController.forgetPassword);

// OTP Verify
adminRouter.get('/otp-verify',adminController.otpVerifyPage);
adminRouter.post('/otp-verify',adminController.otpVerify);

// New Password
adminRouter.get('/new-password',adminController.newPasswordPage);
adminRouter.post('/new-password',adminController.newPassword);

adminRouter.use(userAuth);
adminRouter.get('/',adminController.indexPage);

// Profile
adminRouter.get('/profile',adminController.profilePage);

// Logout
adminRouter.get('/logout',adminController.logout);

// Change Password
adminRouter.get('/accountSetting',adminController.accountSettingPage);
adminRouter.post('/accountSetting',adminController.accountSetting);

adminRouter.get("/edit-profile", adminController.editProfilePage);
adminRouter.post("/edit-profile", upload, adminController.updateProfile);

export default adminRouter;
