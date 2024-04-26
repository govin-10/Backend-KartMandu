const express = require("express");
const app = express();

//regular middlewares
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" })); //This will make us able to get data from the url.

app.get("/", (req, res) => {
  res.send("Hello World");
});

const userRoute = require("./src/routes/userRoute");
const addressRoute = require("./src/routes/addressRoute");
const productRoute = require("./src/routes/productRoute");
const cartRoute = require("./src/routes/cartRoute");
const paymentRoute = require("./src/routes/paymentRoute");

app.use("/users", userRoute);
app.use("/address", addressRoute);
app.use("/product", productRoute);
app.use("/cart", cartRoute);
app.use("/pay", paymentRoute);

module.exports = app;
