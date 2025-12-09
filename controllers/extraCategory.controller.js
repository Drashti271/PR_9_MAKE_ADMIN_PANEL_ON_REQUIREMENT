import CategoryModel from "../models/category.model.js";
import SubCategoryModel from "../models/subCategory.model.js";
import ExtraCategoryModel from "../models/extraCategory.model.js";
import fs from "fs";

const extraCategoryController = {
  async addextraCategoryPage(req, res) {
    const categories = await CategoryModel.find({});
    const subcategories = await SubCategoryModel.find({});
    return res.render("./pages/add-extraCategory.ejs", {
      categories,
      subcategories,
    });
  },
  async addextraCategory(req, res) {
    try {
      req.body.image = req.file.path;
      let data = await ExtraCategoryModel.create(req.body);
      console.log(data);
      return res.redirect(req.get("Referrer") || "/");
    } catch (error) {
      console.log(error.message);
      return res.redirect(req.get("Referrer") || "/");
    }
  },
  async viewextraCategoryPage(req, res) {
    try {
      const extraCategories = await ExtraCategoryModel.find({})
        .populate("category")
        .populate("subcategory");
      // return res.json(extraCategories);
      console.log(extraCategories);
      return res.render("./pages/view-extraCategory.ejs", {
        extraCategories,
      });
    } catch (error) {
      console.log(error);
      return res.render("./pages/view-extraCategory.ejs", {
        extraCategories: [],
      });
    }
  },
  async deleteextraCategory(req, res) {
    try {
      const { id } = req.params;
      let data = await ExtraCategoryModel.findByIdAndDelete(id);
      console.log(data);
      fs.unlinkSync(data.image);
      return res.redirect(req.get("Referrer") || "/");
    } catch (error) {
      console.log(error.message);
      return res.redirect(req.get("Referrer") || "/");
    }
  },
  async editextraCategoryPage(req, res) {
    try {
      const { id } = req.params;

      let data = await ExtraCategoryModel.findById(id);
      const categories = await CategoryModel.find({});
      const subcategories = await SubCategoryModel.find({});

      return res.render("./pages/edit-extraCategory", {
        data,
        categories,
        subcategories,
      });
    } catch (error) {
      console.log(error.message);
      return res.render("./pages/edit-extraCategory", {
        data: {},
        categories: [],
        subcategories: [],
      });
    }
  },
  async editextraCategory(req, res) {
    try {
      const { id } = req.params;

      let oldData = await ExtraCategoryModel.findById(id);

      if (req.file) {
        req.body.image = req.file.path;
      }

      await ExtraCategoryModel.findByIdAndUpdate(id, req.body);

      if (req.file && oldData.image) {
        try {
          fs.unlinkSync(oldData.image);
        } catch (err) {
          console.log("Image delete error:", err.message);
        }
      }

      return res.redirect("/view-extraCategory");
    } catch (error) {
      console.log(error.message);
      return res.redirect(req.get("Referrer") || "/");
    }
  }
};

export default extraCategoryController;
