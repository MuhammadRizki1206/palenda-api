import { Router } from "express";
import { CulinaryController } from "../controllers/culinary.controller";
import upload from "../middlewares/upload.middleware";

const culinaryRouter: Router = Router();
const culinaryController = new CulinaryController();

culinaryRouter.post(
  "/culinary",
  upload.single("image"), // middleware multer untuk upload gambar
  culinaryController.createCulinary.bind(culinaryController)
);
culinaryRouter.get(
  "/culinary",
  culinaryController.getAllCulinary.bind(culinaryController)
);
culinaryRouter.get(
  "/culinary/:id",
  culinaryController.getCulinaryById.bind(culinaryController)
);
culinaryRouter.put(
  "/culinary/:id",
  upload.single("image"),
  culinaryController.updateCulinary.bind(culinaryController)
);
culinaryRouter.delete(
  "/culinary/:id",
  culinaryController.deleteCulinary.bind(culinaryController)
);

export default culinaryRouter;
