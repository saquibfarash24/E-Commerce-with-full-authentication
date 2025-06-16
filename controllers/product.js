import { Product } from "../Models/Product.js";

// add product
export const addProduct = async (req, res) => {
  try {
    let product = await Product.create(req.body);
    res
      .status(201)
      .json({ message: "Product added successfully", product, success: true });
  } catch (error) {
    res.status(500).json({ message: "Server error", success: false });
  }
};

// get all products
export const getAllProducts = async (req, res) => {
  try {
    let products = await Product.find();
    if (!products)
      return res.json({ message: "No products found", success: false });
    res
      .status(200)
      .json({
        message: "Products fetched successfully",
        products,
        success: true,
      });
  } catch (error) {
    res.status(500).json({ message: "Server error", success: false });
  }
};

// get product by id
export const getProductById = async (req, res) => {
  const id = req.params.id;
  try {
    let product = await Product.findById(id);
    if (!product)
      return res.json({ message: "Invalid Id", success: false });
    res
      .status(200)
      .json({
        message: "Product fetched successfully",
        product,
        success: true,
      });
  } catch (error) {
    res.status(500).json({ message: "Server error", success: false });
  }
}

// update product by id 
export const updateProductById = async (req, res) => {
  const id = req.params.id;
  try {
    let product = await Product.findByIdAndUpdate(id, req.body, {new: true});
    if (!product)
      return res.json({ message: "Invalid Id", success: false });
    res.json({
      message: "Product updated successfully",
      product,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", success: false });
  }
};  

// delete product by id
export const deleteProductById = async (req, res) => {
  const id = req.params.id;
  try {
    let product = await Product.findByIdAndDelete(id);
    if (!product)
      return res.json({ message: "Invalid Id", success: false });
    res.json({
      message: "Product deleted successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", success: false });
  }
};