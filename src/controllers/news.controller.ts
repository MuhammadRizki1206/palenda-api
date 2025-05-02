import { Request, Response } from "express";
import { NewsService } from "../services/news.service";
import cloudinary from "../config/cloudinary";

const newsService = new NewsService();

export class NewsController {
  async createNews(req: Request, res: Response): Promise<void> {
    try {
      const file = req.file;
      const { name, description } = req.body;

      if (!file) {
        res.status(400).json({
          message: "Image file is required",
        });
        return;
      }

      const result = await cloudinary.uploader.upload(file.path, {
        folder: "palenda",
      });

      const news = await newsService.createNews(
        result.secure_url,
        name,
        description
      );

      res.status(201).json({
        message: "News created successfully",
        data: news,
        status: res.statusCode,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to create News",
        error,
        status: res.statusCode,
      });
    }
  }

  async getAllNews(req: Request, res: Response) {
    try {
      const news = await newsService.getAllNews();
      res.status(200).json({
        message: "Fetched all News records successfully",
        data: news,
        status: res.statusCode,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to fetch News records",
        status: res.statusCode,
      });
    }
  }

  async getNewsById(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const news = await newsService.getNewsById(id);
      if (news) {
        res.status(200).json({
          message: "Fetched News record successfully",
          data: news,
          status: res.statusCode,
        });
      } else {
        res.status(404).json({
          message: "News not found",
          status: res.statusCode,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Failed to fetch News record",
        status: res.statusCode,
      });
    }
  }

  async updateNews(req: Request, res: Response) {
    const { id } = req.params;
    const { name, description } = req.body;
    const file = req.file;

    try {
      let imageUrl = req.body,
        image;
      if (file) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "palenda",
        });
        imageUrl = result.secure_url;
      }

      const updatedNews = await newsService.updateNews(
        id,
        imageUrl,
        name,
        description
      );
      res.status(200).json({
        message: "News updated successfully",
        data: updatedNews,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to updated News",
        error,
      });
    }
  }

  async deleteNews(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const deletedNews = await newsService.deleteNews(id);
      res.status(200).json({
        message: "News deleted successfully",
        data: deletedNews,
        status: res.statusCode,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to delete News record",
        status: res.statusCode,
      });
    }
  }
}
