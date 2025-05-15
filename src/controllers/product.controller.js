import db from "../models/index.js";

export class ProductController {
  async createProduct(req, res) {
    try {
      const product = await db.Product.create(req.body);
      return res.status(201).json({
        statusCode: 201,
        message: "success",
        data: product,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
  async getAllProduct(_, res) {
    try {
      const product = await db.Product.findAll({
        include: { all: true },
        attributes: ["id", "name", "price"],
      });
      return res.status(201).json({
        statusCode: 201,
        message: "success",
        data: product,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
  async getProductById(req, res) {
    try {
      const { id } = req.params;
      const product = await db.Product.findOne({
        include: { all: true },
        where: { id },
      });
      if (!product) {
        return res.status(404).json({
          statusCode: 404,
          message: "product not found",
        });
      }
      return res.status(201).json({
        statusCode: 201,
        message: "success",
        data: product,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  async updateProductById(req, res) {
    try {
      const { id } = req.params;
      const updatedProduct = await db.Product.update(
        {
          name: req.body.name,
          price: req.body.price,
          categoryId: req.body.categoryId,
        },
        {
          where: { id },
        }
      );

      if (!updatedProduct[0]) {
        return res.status(404).json({
          statusCode: 404,
          message: "product not found",
        });
      }
      return res.status(201).json({
        statusCode: 201,
        message: "success",
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
  async deleteProductById(req, res) {
    try {
      const { id } = req.params;
      const deletedProduct = await db.Product.destroy({
        where: { id },
      });

      if (!deletedProduct) {
        return res.status(404).json({
          statusCode: 404,
          message: "product not found",
        });
      }
      return res.status(201).json({
        statusCode: 201,
        message: "success",
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
}
