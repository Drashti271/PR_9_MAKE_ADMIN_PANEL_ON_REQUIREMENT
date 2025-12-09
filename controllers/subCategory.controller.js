import CategoryModel from "../models/category.model.js";
import SubCategoryModel from "../models/subCategory.model.js";
import fs from "fs";

const subCategoryController = {
  async addSubCategoryPage(req, res) {
    const categories = await CategoryModel.find({});
    return res.render("./pages/add-subCategory.ejs", { categories });
  },
  async addSubCategory(req, res) {
    try {
      req.body.image = req.file.path;
      let data = await SubCategoryModel.create(req.body);
      console.log(data);
      return res.redirect(req.get("Referrer") || "/");
    } catch (error) {
      console.log(error.message);
      return res.redirect(req.get("Referrer") || "/");
    }
  },
  async viewSubCategoryPage(req, res) {
    try {
      let subCategories = await SubCategoryModel.find({}).populate("category");
      // return res.json(subCategories);
      return res.render("./pages/view-subCategory.ejs", {
        subCategories,
      });
    } catch (error) {
      console.log(error);
      return res.render("./pages/view-subCategory.ejs", {
        subCategories: [],
      });
    }
  },
  async deleteSubCategory(req, res) {
    try {
      const { id } = req.params;
      let data = await SubCategoryModel.findByIdAndDelete(id);
      console.log(data);
      fs.unlinkSync(data.image);
      return res.redirect(req.get("Referrer") || "/");
    } catch (error) {
      console.log(error.message);
      return res.redirect(req.get("Referrer") || "/");
    }
  },
  async editSubCategoryPage(req, res) {
    try {
      const { id } = req.params;

      const data = await SubCategoryModel.findById(id);
      const categories = await CategoryModel.find({}); 

      return res.render("./pages/edit-subCategory", {
        data,
        categories,
      });
    } catch (error) {
      console.log(error.message);

      return res.render("./pages/edit-subCategory", {
        data: {},
        categories: [],
      });
    }
  },
  async editSubCategory(req, res) {
    try {
      const { id } = req.params;

      let oldData = await SubCategoryModel.findById(id);

      if (req.file) {
        req.body.image = req.file.path;
      }

      await SubCategoryModel.findByIdAndUpdate(id, req.body);

      if (req.file && oldData.image) {
        try {
          fs.unlinkSync(oldData.image);
        } catch (err) {
          console.log("Image delete error:", err.message);
        }
      }

      return res.redirect("/view-subCategory");
    } catch (error) {
      console.log(error.message);
      return res.redirect(req.get("Referrer") || "/");
    }
  },
};

export default subCategoryController;
