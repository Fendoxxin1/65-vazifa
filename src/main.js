import express from "express";
import config from "./config/index.js";
import db from "./models/index.js";
import categoryRouter from "./routes/category.routes.js";
import productRouter from "./routes/product.routes.js";
const app = express();
app.use(express.json());

app.use("/category", categoryRouter);
app.use("/product", productRouter);

db.sequelize.sync({ force: false, logging: false }).then(() => {
  console.log("Database connected");
});

app.listen(config.PORT, () => {
  console.log("Server running on port", +config.PORT);
});
