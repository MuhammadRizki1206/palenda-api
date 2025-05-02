import { Request, Response } from "express";
import { HistoryService } from "../services/history.service";
import cloudinary from "../config/cloudinary";

const historyService = new HistoryService();

export class HistoryController {
  // Create History
  async createHistory(req: Request, res: Response): Promise<void> {
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
      const history = await historyService.createHistory(
        result.secure_url, // Send only the image URL
        name,
        description
      );

      res.status(201).json({
        message: "History created successfully",
        data: history,
        status: res.statusCode,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to create history",
        error,
        status: res.statusCode,
      });
    }
  }

  // Get All History
  async getAllHistory(req: Request, res: Response) {
    try {
      const history = await historyService.getAllHistory();
      res.status(200).json({
        message: "Fetched all history records successfully",
        data: history,
        status: res.statusCode,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to fetch history records",
        status: res.statusCode,
      });
    }
  }

  // Get History by ID
  async getHistoryById(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const history = await historyService.getHistoryById(id);

      if (history) {
        res.status(200).json({
          message: "Fetched history record successfully",
          data: history,
          status: res.statusCode,
        });
      } else {
        res.status(404).json({
          message: "History not found",
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
  async updateHistory(req: Request, res: Response) {
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

      const updatedHistory = await historyService.updateHistory(
        id,
        imageUrl,
        name,
        description
      );
      res.status(200).json({
        message: "History updated successfully",
        data: updatedHistory,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to updated history",
        error,
      });
    }
  }
  // Delete History
  async deleteHistory(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const deletedHistory = await historyService.deleteHistory(id);
      res.status(200).json({
        message: "History deleted successfully",
        data: deletedHistory,
        status: res.statusCode,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to delete history record",
        status: res.statusCode,
      });
    }
  }
}
