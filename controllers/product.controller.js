import CategoryModel from "../models/category.model.js";
import SubCategoryModel from "../models/subCategory.model.js";
import ExtraCategoryModel from "../models/extraCategory.model.js";
import ProductModel from "../models/product.model.js";
// import { getProductReviews } from "./reviewController.js";
import fs from "fs";

const productController = {

  async addproductPage(req, res) {
    const categories = await CategoryModel.find({});
    const subcategories = await SubCategoryModel.find({});
    const extraCategories = await ExtraCategoryModel.find({});
    return res.render("./pages/add-product.ejs", {
      categories,
      subcategories,
      extraCategories,
    });
  },

  async addproduct(req, res) {
    try {
      req.body.images = req.files?.map((file) => file.path) || [];
      await ProductModel.create(req.body);
      return res.redirect(req.get("Referrer") || "/");
    } catch (error) {
      console.log(error.message);
      return res.redirect(req.get("Referrer") || "/");
    }
  },

  async viewproductPage(req, res) {
    try {
      const products = await ProductModel.find({})
        .populate("category")
        .populate("subcategory")
        .populate("extracategory");

      return res.render("./pages/view-product.ejs", { products });
    } catch (error) {
      console.log(error);
      return res.render("./pages/view-product.ejs", { products: [] });
    }
  },

  async deleteproduct(req, res) {
    try {
      const { id } = req.params;
      let data = await ProductModel.findByIdAndDelete(id);

      if (data.images) {
        data.images.forEach((img) => fs.unlinkSync(img));
      }

      return res.redirect(req.get("Referrer") || "/");
    } catch (error) {
      console.log(error.message);
      return res.redirect(req.get("Referrer") || "/");
    }
  },

  async editproductPage(req, res) {
    try {
      const { id } = req.params;

      const data = await ProductModel.findById(id);
      const categories = await CategoryModel.find({});
      const subcategories = await SubCategoryModel.find({});
      const extraCategories = await ExtraCategoryModel.find({});

      return res.render("./pages/edit-product", {
        data,
        categories,
        subcategories,
        extraCategories,
      });
    } catch (error) {
      console.log(error.message);
      return res.render("./pages/edit-product", {
        data: {},
        categories: [],
        subcategories: [],
        extraCategories: [],
      });
    }
  },

  async editproduct(req, res) {
    try {
      const { id } = req.params;
      let oldProduct = await ProductModel.findById(id);

      if (req.files && req.files.length > 0) {
        req.body.images = req.files.map((file) => file.path);

        oldProduct.image.forEach((img) => {
          try {
            fs.unlinkSync(img);
          } catch (err) {
            console.log("Old image delete error:", err.message);
          }
        });
      }

      await ProductModel.findByIdAndUpdate(id, req.body);
      return res.redirect("/view-product");
    } catch (error) {
      console.log(error.message);
      return res.redirect(req.get("Referrer") || "/");
    }
  },

  async productDetails(req, res) {
    try {
      const { id } = req.params;

      const product = await ProductModel.findById(id)
        .populate("category")
        .populate("subcategory")
        .populate("extracategory");

      const reviews = await getProductReviews(product._id);

      product.image = product.image.map((img) => img.replace(/\\/g, "/"));

      return res.render("./pages/product-details.ejs", { product, reviews });

    } catch (error) {
      console.log(error.message);
      return res.send("Error while loading product page");
    }
  },
};

export default productController;
