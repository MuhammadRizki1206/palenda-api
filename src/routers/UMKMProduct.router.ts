import { Router } from "express";
import { UMKMProductController } from "../controllers/UMKMProduct.controller";
import upload from "../middlewares/upload.middleware";

const uMKMProductRouter: Router = Router();
const uMKMProductController = new UMKMProductController();

uMKMProductRouter.post(
  "/umkm",
  upload.single("image"),
  uMKMProductController.createUMKMProduct
);

uMKMProductRouter.get("/umkm", uMKMProductController.getAllUMKMProduct);

uMKMProductRouter.get("/umkm/:id", uMKMProductController.getUMKMProductById);

uMKMProductRouter.put(
  "/umkm/:id",
  upload.single("image"),
  uMKMProductController.updateUMKMProduct
);

uMKMProductRouter.delete("/umkm/:id", uMKMProductController.deleteUMKMProduct);

export default uMKMProductRouter;
