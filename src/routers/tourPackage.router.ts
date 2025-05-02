import { Router } from "express";
import { TourPackageController } from "../controllers/tourPackages.controller";
import upload from "../middlewares/upload.middleware"; // Pastikan middleware upload sesuai dengan konfigurasi kamu

const tourPackageRouter: Router = Router();
const tourPackageController = new TourPackageController();

// Create a new Tour Package
tourPackageRouter.post(
  "/tourPackage",
  upload.single("image"),
  tourPackageController.createTourPackage
);

// Get all Tour Packages
tourPackageRouter.get("/tourPackage", tourPackageController.getAllTourPackages);

// Get a single Tour Package by ID
tourPackageRouter.get(
  "/tourPackage/:id",
  tourPackageController.getTourPackageById
);

// Update an existing Tour Package
tourPackageRouter.put(
  "/tourPackage/:id",
  upload.single("image"),
  tourPackageController.updateTourPackage
);

// Delete a Tour Package
tourPackageRouter.delete(
  "/tourPackage/:id",
  tourPackageController.deleteTourPackage
);

export default tourPackageRouter;
