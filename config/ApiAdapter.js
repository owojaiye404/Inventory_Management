const Axios = require("axios");

const apiClient = Axios.create({
  baseURL: process.env.baseURL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});
exports.getAllProduct = async (req, res) => {
  try {
    const response = await apiClient.get("/products");
    res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "an error occured" });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await apiClient.get(`/products/${id}`);
    res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "an error occured" });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const response = await apiClient.post("/products", req.body);
    return response.data;
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "an error occured" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await apiClient.put(`/products/${id}`, req.body);
    res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "an error occured" });
  }
};
