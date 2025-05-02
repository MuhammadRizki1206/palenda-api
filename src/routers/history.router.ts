import { Router } from "express";
import { HistoryController } from "../controllers/history.controller";
import upload from "../middlewares/upload.middleware";

const historyRouter: Router = Router();
const historyController = new HistoryController();

historyRouter.post(
  "/history",
  upload.single("image"), // middleware multer untuk upload gambar
  historyController.createHistory.bind(historyController)
);
historyRouter.get(
  "/history",
  historyController.getAllHistory.bind(historyController)
);
historyRouter.get(
  "/history/:id",
  historyController.getHistoryById.bind(historyController)
);
historyRouter.put(
  "/history/:id",
  upload.single("image"),
  historyController.updateHistory.bind(historyController)
);
historyRouter.delete(
  "/history/:id",
  historyController.deleteHistory.bind(historyController)
);

export default historyRouter;
