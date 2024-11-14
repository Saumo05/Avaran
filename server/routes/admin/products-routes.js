import express from "express";
import { imageUploadUtil, upload } from "../../helpers/cloudinary.js";
import {
  addProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
  handleImageUpload,
} from "../../controllers/admin/products-controller.js";

const router = express.Router();

//It will call the handleImageUpload controller when it will hit the /upload-image url in the frontend
router.post("/upload-image", upload.single("my_file"), handleImageUpload);

router.post("/add", addProduct);
router.get("/get", fetchAllProducts);
router.put("/edit/:id", editProduct);
router.delete("/delete/:id", deleteProduct);

export default router;
