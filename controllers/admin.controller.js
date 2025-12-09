import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import fs from "fs";
let otp = null;

const adminController = {
  indexPage(req, res) {
    return res.render("./index.ejs");
  },
  registerUserPage(req, res) {
    return res.render("./pages/register.ejs");
  },
  loginUserPage(req, res) {
    return res.render("./pages/login.ejs");
  },
  async registerUser(req, res) {
    try {
      const { password, confirmPassword } = req.body;
      if (password != confirmPassword) {
        req.flash("error", "Password And Confirm Password Not Match.");
        return res.redirect("/register");
      }
      let hashPassword = await bcrypt.hash(password, 10);
      req.body.password = hashPassword;
      await UserModel.create(req.body);
      req.flash("success", "User Created Successfully.");
      return res.redirect("/login");
    } catch (error) {
      console.log(error.message);
      return res.redirect("/register");
    }
  },
  async loginUser(req, res) {
    try {
      const { username, password } = req.body;
      let user = await UserModel.findOne({ username });

      if (!user) {
        console.log("User Not Found.");
        return res.redirect("/login");
      }

      let isValid = await bcrypt.compare(password, user.password);

      if (!isValid) {
        req.flash("error", "Wrong Password.");
        return res.redirect("/login");
      }

      req.flash("success", "Login Success");
      return res.cookie("id", user.id).redirect("/");
    } catch (error) {
      console.log(error.message);
      return res.redirect("/login");
    }
  },
  profilePage(req, res) {
    return res.render("./pages/profile.ejs");
  },
  async editProfilePage(req, res) {
    try {
      const userId = req.session.userId;

      const user = await UserModel.findById(userId);

      return res.render("pages/edit-profile", {
        user,
      });
    } catch (err) {
      console.log(err);
      return res.redirect("/profile");
    }
  },
  async updateProfile(req, res) {
    try {
      const userId = req.session.userId;

      const { username, bio, gender, location } = req.body;

      let updateData = { username, bio, gender, location };

      if (req.file) {
        updateData.image = req.file.filename;
      }

      await UserModel.findByIdAndUpdate(userId, updateData);

      res.redirect("/profile");
    } catch (err) {
      console.log(err);
      res.redirect("/edit-profile");
    }
  },
  logout(req, res) {
    res.clearCookie("id");
    return res.redirect("/login");
  },
  accountSettingPage(req, res) {
    return res.render("./pages/accountSetting.ejs");
  },
  async accountSetting(req, res) {
    try {
      const { currentPassword, newPassword, confirmPassword } = req.body;
      const { id } = req.cookies;

      let user = await UserModel.findById(id);

      let isValid = await bcrypt.compare(currentPassword, user.password);

      if (isValid) {
        if (newPassword == confirmPassword) {
          user.password = await bcrypt.hash(newPassword, 10);
          await user.save();
          req.flash("Success", "Password Changed.");
          return res.redirect("/logout");
        } else {
          req.flash("error", "New Password and Confirm Password Not Match.");
          return res.redirect(req.get("Referrer") || "/");
        }
      } else {
        req.flash("error", "Current Password Not Match.");
        return res.redirect(req.get("Referrer") || "/");
      }
    } catch (error) {
      console.log(error.message);
      return res.redirect(req.get("Referrer") || "/");
    }
  },
  async forgetPassword(req, res) {
    try {
      const { email } = req.body;
      let user = await UserModel.findOne({ email });

      if (user) {
        const payload = {
          id: user.id,
        };

        otp = Math.floor(10000 + Math.random() * 999999);

        console.log(otp);

        const transporter = nodemailer.createTransport({
          service: "gmail",
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: "drashtibilimoria@gmail.com",
            pass: "rqjx uohs onfk fumr",
          },
        });

        const info = await transporter.sendMail({
          from: "<drashtibilimoria@gmail.com>",
          to: user.email,
          subject: "OTP verify for Forget Password.",
          html: `
                    <div style="font-family: Arial, sans-serif; background: #f7f7f7; padding: 20px;">
                    
                    <div style="max-width: 500px; margin: auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0px 4px 12px rgba(0,0,0,0.15);">
                        
                        <!-- Header Image -->
                        <img src="https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=800&q=80" 
                            style="width: 100%; height: 180px; object-fit: cover;" />

                        <div style="padding: 25px;">
                        <h2 style="text-align: center; color: #333;">OTP Verification</h2>

                        <p style="font-size: 15px; color: #555;">
                            Hello User,<br><br>
                            Please use the following One-Time Password (OTP) to verify your identity:
                        </p>

                        <!-- OTP Box -->
                        <div style="
                            font-size: 32px;
                            font-weight: bold;
                            text-align: center;
                            background: #f0f4ff;
                            padding: 15px;
                            border-radius: 8px;
                            letter-spacing: 5px;
                            color: #2d4cff;
                            margin: 20px 0;
                        ">
                            ${otp}
                        </div>

                        <p style="font-size: 14px; color: #666;">
                            This OTP is valid for 5 minutes. Please do not share it with anyone for security reasons.
                        </p>

                        <p style="margin-top: 25px; font-size: 14px; color: #444;">
                            Regards,<br>
                            <b>Your App Team</b>
                        </p>
                        </div>
                    </div>

                    </div>
                `,
        });

        console.log("Message sent:", info.messageId);

        const token = jwt.sign(payload, "key");
        console.log(token);
        res.cookie("token", token);
        return res.redirect("/otp-verify");
      } else {
        return res.redirect("/login");
      }
    } catch (error) {
      console.log(error.message);
      return res.redirect("/login");
    }
  },
  otpVerifyPage(req, res) {
    return res.render("./pages/otp-verify.ejs");
  },
  otpVerify(req, res) {
    if (req.body.otp == otp) {
      return res.redirect("/new-password");
    }
    return res.redirect(req.get("Referrer") || "/");
  },
  newPasswordPage(req, res) {
    return res.render("./pages/new-password.ejs");
  },
  async newPassword(req, res) {
    try {
      const { newPass, confirmPass } = req.body;

      if (newPass == confirmPass) {
        const { token } = req.cookies;
        const decode = jwt.verify(token, "key");
        const user = await UserModel.findById(decode.id);
        if (user) {
          user.password = await bcrypt.hash(newPass, 10);
          await user.save();
          req.flash("Success", "Password Changed.");
          return res.redirect("/login");
        } else {
          req.flash("error", "User Not Found.");
          return res.redirect("/login");
        }
      } else {
        req.flash("error", "New Password and Confirm Password Not Match.");
        return res.redirect("/login");
      }
    } catch (error) {
      console.log(error.message);
      return res.redirect("/login");
    }
  },
};

export default adminController;
