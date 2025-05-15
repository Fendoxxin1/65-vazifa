import { Sequelize, DataTypes } from "sequelize";
import config from "../config/index.js";
import Category from "./category.model.js";
import Product from "./product.model.js";

const sequelize = new Sequelize(config.PG_DB, config.PG_USER, config.PG_PASS, {
  host: config.PG_HOST,
  dialect: config.DB_DIALECT,
});

const db = {};

db.Category = Category(sequelize, DataTypes);
db.Product = Product(sequelize, DataTypes);

db.Category.hasMany(db.Product, { foreignKey: "categoryId" });
db.Product.belongsTo(db.Category, { foreignKey: "categoryId" });

db.sequelize = sequelize;
db.Sequelize = Sequelize;


export default db;
