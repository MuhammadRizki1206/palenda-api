import { Request, Response } from "express";
import { CulinaryService } from "../services/culinary.service";
import cloudinary from "../config/cloudinary";

const culinaryService = new CulinaryService();

export class CulinaryController {
  // Create History
  async createCulinary(req: Request, res: Response): Promise<void> {
    try {
      const file = req.file;
      const { name, description } = req.body;

      if (!file) {
        res.status(400).json({ message: "Image file is required" });
        return;
      }

      // Upload image to Cloudinary in the controller
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "palenda",
      });

      // Call the service to store history with the image URL
      const culinary = await culinaryService.createCulinary(
        result.secure_url, // Send only the image URL
        name,
        description
      );

      res.status(201).json({
        message: "Culinary created successfully",
        data: culinary,
        status: res.statusCode,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to create culinary",
        error,
        status: res.statusCode,
      });
    }
  }

  // Get All Culinary
  async getAllCulinary(req: Request, res: Response) {
    try {
      const culinary = await culinaryService.getAllCulinary();
      res.status(200).json({
        message: "Fetched all culinary records successfully",
        data: culinary,
        status: res.statusCode,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to fetch culinary records",
        status: res.statusCode,
      });
    }
  }

  // Get History by ID
  async getCulinaryById(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const culinary = await culinaryService.getCulinaryById(id);

      if (culinary) {
        res.status(200).json({
          message: "Fetched culinary record successfully",
          data: culinary,
          status: res.statusCode,
        });
      } else {
        res.status(404).json({
          message: "culinary not found",
          status: res.statusCode,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Failed to fetch history record",
        status: res.statusCode,
      });
    }
  }

  // Update History (masih manual image via URL dari body)
  async updateCulinary(req: Request, res: Response) {
    const { id } = req.params;
    const { name, description } = req.body;
    const file = req.file;

    try {
      let imageUrl = req.body.image;

      if (file) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "palenda",
        });
        imageUrl = result.secure_url;
      }

      const updatedCulinary = await culinaryService.updateCulinary(
        id,
        imageUrl,
        name,
        description
      );

      res.status(200).json({
        message: "Culinary updated successfully",
        data: updatedCulinary,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to update culinary",
        error,
      });
    }
  }

  // Delete History
  async deleteCulinary(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const deletedCulinary = await culinaryService.deleteCulinary(id);
      res.status(200).json({
        message: "Culinary deleted successfully",
        data: deletedCulinary,
        status: res.statusCode,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to delete culinary record",
        status: res.statusCode,
      });
    }
  }
}
