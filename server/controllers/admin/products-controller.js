import { imageUploadUtil } from "../../helpers/cloudinary.js";
import Product from "../../models/Product.js";

const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log("Cloudinary Upload Error: ", error);
    res.json({
      success: false,
      message: "Error occured",
    });
  }
};

//add a new product
const addProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      colour,
      price,
      salePrice,
      totalStock,
    } = req.body;

    const newlyCreatedProduct = new Product({
      image,
      title,
      description,
      category,
      colour,
      price,
      salePrice,
      totalStock,
    });

    await newlyCreatedProduct.save();
    res.status(201).json({
      success: true,
      data: newlyCreatedProduct,
    });
  } catch (e) {
    console.log("Error in Adding a Product", error);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

//fetch all products
const fetchAllProducts = async (req, res) => {
  try {
    const listOfProducts = await Product.find({});
    res.status(200).json({
      success: true,
      data: listOfProducts,
    });
  } catch (e) {
    console.log("Error in fetching a Product", error);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};
//edit a product
const editProduct = async (req, res) => {
  try {
    const { id } = req.params; //Will pass the product id as params from the frontend
    const {
      image,
      title,
      description,
      category,
      colour,
      price,
      salePrice,
      totalStock,
    } = req.body;

    const findProduct = await Product.findById(id);
    if (!findProduct)
      return res.status(400).json({
        success: false,
        message: "Product not found",
      }); //Checking whether the Product exists or not

    findProduct.title = title || findProduct.title; //If a modified title is passed then only change the title otherwise take the same title
    findProduct.image = image || findProduct.image;
    findProduct.description = description || findProduct.description;
    findProduct.category = category || findProduct.category;
    findProduct.colour = colour || findProduct.colour;
    findProduct.price = price === "" ? 0 : price || findProduct.price;
    findProduct.salePrice =
      salePrice === "" ? 0 : salePrice || findProduct.salePrice;
    findProduct.totalStock = totalStock || findProduct.totalStock;

    await findProduct.save();

    res.status(200).json({
      success: true,
      data: findProduct,
    });
  } catch (e) {
    console.log("Error in editing a Product", error);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};
//delete a product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product)
      return res.status(400).json({
        success: false,
        message: "Product not found",
      }); //Checking whether the Product exists or not

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (e) {
    console.log("Error in deleting a Product", e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

export {
  handleImageUpload,
  addProduct,
  fetchAllProducts,
  editProduct,
  deleteProduct,
};
