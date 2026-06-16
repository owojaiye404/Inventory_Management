const Product = require("../models/product");
const cloudinary = require("../middleware/Cloudinary");
const Cloudinary = require("../config/cloudinaryConfig");

exports.updateProductImage = async (req, res) => {
  const productID = req.params.id;
  try {
    const product = await Product.findById(productID);
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }
    if (!req.file) {
      return res.status(400).json({
        message: "No image uploaded",
      });
    }

    if (product.imageUrl) {
      const publicId = product.imageUrl.split("/").pop().split(".")[0];
      await Cloudinary.uploader.destroy(`products/${publicId}`);
    }

    console.log("FILE:", req.file);

    product.imageUrl = req.file.path;

    await product.save();

    res.status(200).json({ message: "image uploded successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "an error occured" });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, price, quantity } = req.body;
    if (!req.file) {
      return res.status(400).json({
        message: "No image uploaded",
      });
    }

    const newProduct = await Product.create({
      name,
      price,
      quantity,
      imageUrl: req.file.path,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
