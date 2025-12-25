# PR_9_MAKE_ADMIN_PANEL_ON_REQUIREMENT

# Project Documentation

## Overview

This project is a complete **Admin Panel Management System** built using **Node.js**, **Express.js**, **MongoDB**, **EJS**, and **Multer** for image uploads. It includes modules like Categories, Sub-Categories, Extra Categories, Products, and User Authentication. The goal of the project is to provide a full admin dashboard where an admin can manage all product-related data with CRUD operations.

This documentation provides a structured overview of the project, including folder structure, functionality, routes, controllers, models, and views.

## Folder Structure

Below is a detailed explanation of each main folder and its purpose:

### **configs/**

Contains configuration files like database connection and environment variable loader.

### **controllers/**

Each controller handles logic for a specific module. Example: category.controller handles creating, editing, deleting, and viewing categories.

### **middlewares/**

Reusable functions that run before controllers. Useful for authentication, file uploads, or messaging.

### **models/**

Contains Mongoose schemas. Each file represents a MongoDB collection.

### **routers/**

Each route file connects HTTP methods (GET, POST, PUT, DELETE) to their controller functions.

### **views/**

Includes EJS pages used to render admin UI.

### **public/**

Stores static files (CSS, JS, images) accessible to the browser.

### **uploads/**

Folder where uploaded product or category images are stored.

The project is organized as follows:

```
configs/
  ├── database.js
  └── dotenv.js

controllers/
  ├── admin.controller.js
  ├── category.controller.js
  ├── extraCategory.controller.js
  ├── product.controller.js
  └── subCategory.controller.js

middlewares/
  ├── flashMsg.js
  ├── imageUpload.js
  └── userAuth.js

models/
  ├── category.model.js
  ├── extraCategory.model.js
  ├── product.model.js
  ├── subCategory.model.js
  └── user.model.js

routers/
  ├── admin.route.js
  ├── category.route.js
  ├── extraCategory.route.js
  ├── index.js
  ├── product.route.js
  └── subCategory.route.js

public/
uploads/

views/
  ├── pages/
  └── partials/
```

## Config Files

### **database.js**

Handles MongoDB connection using Mongoose.

### **dotenv.js**

Loads environment variables.

## Controllers

Each controller manages CRUD operations for its respective module.

* **admin.controller.js** – Admin login, dashboard, account setting.
* **category.controller.js** – Category CRUD.
* **extraCategory.controller.js** – Extra category CRUD.
* **product.controller.js** – Product CRUD & details.
* **subCategory.controller.js** – Sub-category CRUD.

## Middlewares

* **flashMsg.js** – For displaying flash messages.
* **imageUpload.js** – Handles multer-based image uploads.
* **userAuth.js** – Auth protection middleware.

## Models

Each model defines schema for MongoDB collections.

* Category
* Extra Category
* Product
* Sub Category
* User

## Routes

All route files connect controllers to endpoints.

Example:

```
/admin -> admin.route.js
/category -> category.route.js
/product -> product.route.js
```

## Views (EJS)

### Pages

Contains all views for:

* Admin login
* Product add/edit/view
* Category add/edit/view
* Sub-category add/edit/view
* Extra-category add/edit/view
* User pages (register, profile, OTP, password reset)

### Partials

* **header.ejs**
* **footer.ejs**

## Main Entry

### **index.js**

Loads express, middleware, routes, DB connection and starts the server.

---
