import CategoryModel from "../models/category.model.js";
import fs from "fs";

const categoryController = {
    addCategoryPage(req,res){
        return res.render('./pages/add-category.ejs');
    },
    async addCategory(req,res){
        try {
            req.body.image = req.file.path;
            let data = await CategoryModel.create(req.body);
            console.log(data);
            return res.redirect(req.get('Referrer') || '/');
        } catch (error) {
            console.log(error.message);
            return res.redirect(req.get('Referrer') || '/');
        }
    },
    async viewCategorypage(req,res){
        try {
            let categorys = await CategoryModel.find({});
            return res.render('./pages/view-category.ejs',{
                categorys
            });
        } catch (error) {
            return res.render('./pages/view-category.ejs',{
                categorys : []
            });   
        }
    },
    async deleteCategory(req,res){
        try {
            const {id} = req.params;
            let data = await CategoryModel.findByIdAndDelete(id);
            console.log(data);
            fs.unlinkSync(data.image);
            return res.redirect(req.get("Referrer") || "/");
        } catch (error) {
            console.log(error.message);
            return res.redirect(req.get("Referrer") || "/");
        }
    },
    async editCategoryPage(req,res){
        try {
            const {id} = req.params;
            let data = await CategoryModel.findById(id);
            return res.render('./pages/edit-category.ejs',{
                data
            });
        } catch (error) {
            console.log(error.message);
            return res.render('./pages/edit-category.ejs',{
                data : {}
            });
        }
    },
    async editCategory(req,res){
        try {
            const {id} = req.params;

            if(req.file){
                req.body.image = req.file.path;
            }

            let data = await CategoryModel.findByIdAndUpdate(id,req.body);

            if(req.file){
                fs.unlinkSync(data.image);
            }

            return res.redirect('/view-category');
        } catch (error) {
            console.log(error.message);
            return res.redirect(req.get("Referrer") || "/");
        }
    }
}

export default categoryController;