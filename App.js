require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const productRoute = require("./routes/productRoutes");
const userRoute = require("./routes/userRoute");
const adapterRoute = require("./routes/AdapterRoutes");
const app = express();
app.use(express.json());

connectDB();

app.use("/products", productRoute);
app.use("/users", userRoute);
app.use("/adapter", adapterRoute);
app.listen(process.env.PORT, () => {
  console.log(`server runing on ${process.env.PORT}`);
});
