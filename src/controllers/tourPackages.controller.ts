import { Request, Response } from "express";
import { TourPackageService } from "../services/tourPackage.service";
import cloudinary from "../config/cloudinary"; // Sesuaikan dengan path config Cloudinary kamu
import fs from "fs";

const tourPackageService = new TourPackageService();

export class TourPackageController {
  // Create Tour Package
  async createTourPackage(req: Request, res: Response) {
    try {
      const { title, price, location, logo, description } = req.body;
      const file = req.file;

      // Upload image to Cloudinary
      let image = ""; // Pastikan image bisa null
      if (file) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "tour-packages",
        });
        image = result.secure_url;
        fs.unlinkSync(file.path); // Hapus file lokal setelah upload
      }

      // Create new Tour Package in the database
      const newPackage = await tourPackageService.createTourPackage(
        image,
        title,
        price,
        location,
        logo,
        description
      );

      res.status(201).json({
        message: "Tour Package created successfully",
        data: newPackage,
        status: res.statusCode,
      });
    } catch (error: any) {
      res.status(500).json({
        message: "Failed to create tour package",
        error: error.message, // Menampilkan pesan error lebih jelas
        status: res.statusCode,
      });
    }
  }

  // Get All Tour Packages
  async getAllTourPackages(req: Request, res: Response) {
    try {
      const packages = await tourPackageService.getAllTourPackages();
      res.status(200).json({
        message: "Fetched all tour packages successfully",
        data: packages,
        status: res.statusCode,
      });
    } catch (error: any) {
      res.status(500).json({
        message: "Failed to fetch tour packages",
        error: error.message, // Menampilkan pesan error lebih jelas
        status: res.statusCode,
      });
    }
  }

  // Get Tour Package by ID
  async getTourPackageById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const tourPackage = await tourPackageService.getTourPackageById(id);

      if (tourPackage) {
        res.status(200).json({
          message: "Tour package fetched successfully",
          data: tourPackage,
          status: res.statusCode,
        });
      } else {
        res.status(404).json({
          message: "Tour package not found",
          status: res.statusCode,
        });
      }
    } catch (error: any) {
      res.status(500).json({
        message: "Failed to fetch tour package",
        error: error.message, // Menampilkan pesan error lebih jelas
        status: res.statusCode,
      });
    }
  }

  // Update Tour Package
  async updateTourPackage(req: Request, res: Response) {
    const { id } = req.params;
    const { title, price, location, logo, description } = req.body;
    const file = req.file;

    try {
      let image = "";
      if (file) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "tour-packages",
        });
        image = result.secure_url;
        fs.unlinkSync(file.path); // Hapus file lokal setelah upload
      }

      const updatedPackage = await tourPackageService.updateTourPackage(
        id,
        image,
        title,
        price,
        location,
        logo,
        description
      );

      if (updatedPackage) {
        res.status(200).json({
          message: "Tour package updated successfully",
          data: updatedPackage,
          status: res.statusCode,
        });
      } else {
        res.status(404).json({
          message: "Tour package not found",
          status: res.statusCode,
        });
      }
    } catch (error: any) {
      res.status(500).json({
        message: "Failed to update tour package",
        error: error.message, // Menampilkan pesan error lebih jelas
        status: res.statusCode,
      });
    }
  }

  // Delete Tour Package
  async deleteTourPackage(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const result = await tourPackageService.deleteTourPackage(id);

      if (result) {
        res.status(200).json({
          message: "Tour package deleted successfully",
          status: res.statusCode,
        });
      } else {
        res.status(404).json({
          message: "Tour package not found",
          status: res.statusCode,
        });
      }
    } catch (error: any) {
      res.status(500).json({
        message: "Failed to delete tour package",
        error: error.message, // Menampilkan pesan error lebih jelas
        status: res.statusCode,
      });
    }
  }
}
