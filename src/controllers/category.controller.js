import { where } from "sequelize";
import db from "../models/index.js";

export class CategoryController {
  async createCategory(req, res) {
    try {
      const category = await db.Category.create(req.body);
      return res.status(201).json({
        statusCode: 201,
        message: "success",
        data: category,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  async getAllCategories(_, res) {
    try {
      const categories = await db.Category.findAll({ include: { all: true } });
      return res.status(201).json({
        statusCode: 201,
        message: "success",
        data: categories,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  async getCategoryById(req, res) {
    try {
      const { id } = req.params;
      const category = await db.Category.findOne({
        include: { all: true },
        where: { id },
      });
      if (!category) {
        return res.status(404).json({
          statusCode: 404,
          message: "category not found",
        });
      }
      return res.status(201).json({
        statusCode: 201,
        message: "success",
        data: category,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  async updateCategoryById(req, res) {
    try {
      const { id } = req.params;
      const updatedCategory = await db.Category.update(
        {
          name: req.body.name,
        },
        {
          where: { id },
        }
      );

      if (!updatedCategory[0]) {
        return res.status(404).json({
          statusCode: 404,
          message: "category not found",
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
  async deleteCategoryById(req, res) {
    try {
      const { id } = req.params;
      const deletedCategory = await db.Category.destroy({
        where: { id },
      });

      if (!deletedCategory) {
        return res.status(404).json({
          statusCode: 404,
          message: "category not found",
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
