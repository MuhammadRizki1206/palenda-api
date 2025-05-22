import { Request, Response } from "express";
import { UMKMProductService } from "../services/UMKMProduct.service";
import cloudinary from "../config/cloudinary";
import fs from "fs";
import { umkmProductValidator } from "../validators/product.validator";

const uMKMProductService = new UMKMProductService();

export class UMKMProductController {
  async createUMKMProduct(req: Request, res: Response) {
    try {
      const { name, price, location, logo, description, stock } = req.body;
      const file = req.file;

      // upload image to cloudinary
      let image = "";
      if (file) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "umkm-product",
        });
        image = result.secure_url;
        fs.unlinkSync(file.path);
      }

      const newProduct = await uMKMProductService.createUMKMProduct(
        image,
        name,
        price,
        location,
        logo,
        description,
        stock
      );

      res.status(201).json({
        message: "UMKM Product created successfully",
        data: newProduct,
        status: res.statusCode,
      });
    } catch (error: any) {
      res.status(500).json({
        message: "Failed to create UMKM Product",
        error: error.message,
        status: res.statusCode,
      });
    }
  }

  async getAllUMKMProduct(req: Request, res: Response) {
    try {
      const product = await uMKMProductService.getAllUMKMProduct();
      res.status(200).json({
        message: "Fetched all umkm product successfully",
        data: product,
        status: res.statusCode,
      });
    } catch (error: any) {
      res.status(500).json({
        message: "Failed to fetch umkm product",
        error: error.message,
        status: res.statusCode,
      });
    }
  }

  async getUMKMProductById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const uMKMProduct = await uMKMProductService.getUMKMProductById(id);

      if (uMKMProduct) {
        res.status(200).json({
          message: "UMKM Product fetched successfully",
          data: uMKMProduct,
          status: res.statusCode,
        });
      } else {
        res.status(404).json({
          message: "UMKM Product not found",
          status: res.statusCode,
        });
      }
    } catch (error: any) {
      res.status(500).json({
        message: "Failed to fetch UMKM Product",
        error: error.message,
        status: res.statusCode,
      });
    }
  }

  async updateUMKMProduct(req: Request, res: Response) {
    const { id } = req.params;
    const { name, price, location, logo, description, stock } = req.body;
    const file = req.file;
    try {
      let image = "";
      if (file) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "umkm-product",
        });
        image = result.secure_url;
        fs.unlinkSync(file.path);
      }

      const updatedProduct = await uMKMProductService.updateUMKMProduct(
        id,
        image,
        name,
        price,
        location,
        logo,
        description,
        stock // ✅ pastikan stock berupa number
      );

      if (updatedProduct) {
        res.status(200).json({
          message: "UMKM Product updated successfully",
          data: updatedProduct,
          status: res.statusCode,
        });
      } else {
        res.status(404).json({
          message: "UMKM Product not found",
          status: res.statusCode,
        });
      }
    } catch (error: any) {
      res.status(500).json({
        message: "Failed to update UMKM Product",
        error: error.message,
        status: res.statusCode,
      });
    }
  }

  async deleteUMKMProduct(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const result = await uMKMProductService.deleteUMKMProduct(id);

      if (result) {
        res.status(200).json({
          message: "UMKM Product deleted successfully",
          status: res.statusCode,
        });
      } else {
        res.status(404).json({
          message: "UMKM Product not found",
          status: res.statusCode,
        });
      }
    } catch (error: any) {
      res.status(500).json({
        message: "Failed to delete UMKM Poduct",
        error: error.message,
        status: res.statusCode,
      });
    }
  }
}
