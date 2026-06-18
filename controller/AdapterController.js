const apiadapter = require("../config/ApiAdapter");
const product = require("../models/fakeStore");

exports.getproducts = async (req, res) => {
  await apiadapter.getAllProduct(req, res);
};

exports.createproduct = async (req, res) => {
  try {
    const { title, price } = req.body;
    if (!title || !price) {
      return res.status(400).json({ messsage: "no empty field is required" });
    }
    const response = await apiadapter.createProduct(req);

    const saveProduct = await product.create({
      externalId: response.id,
      title: response.title,
      price: response.price,
      description: response.description,
    });
    res.status(201).json({
      success: true,
      data: saveProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.updateproducts = async (req, res) => {
  await apiadapter.updateProduct(req, res);
};

exports.getproduct = async (req, res) => {
  await apiadapter.getProductById(req, res);
};
