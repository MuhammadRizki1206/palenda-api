import { Router } from "express";
import { NewsController } from "../controllers/news.controller";
import upload from "../middlewares/upload.middleware";

const newsRouter: Router = Router();
const newsController = new NewsController();

newsRouter.post(
  "/news",
  upload.single("image"),
  newsController.createNews.bind(newsController)
);
newsRouter.get("/news", newsController.getAllNews.bind(newsController));
newsRouter.get("/news/:id", newsController.getNewsById.bind(newsController));
newsRouter.put(
  "/news/:id",
  upload.single("image"),
  newsController.updateNews.bind(newsController)
);

newsRouter.delete("/news/:id", newsController.deleteNews.bind(newsController));

export default newsRouter;
