import express from "express";
import authRouter from "./routers/auth.router";
import historyRouter from "./routers/history.router";
import culinaryRouter from "./routers/culinary.router";
import tourPackageRouter from "./routers/tourPackage.router";
import uMKMProductRouter from "./routers/UMKMProduct.router";
import newsRouter from "./routers/news.router";
import environment from "dotenv";
import cors from "cors";

environment.config();

const app = express();
const PORT = process.env.SERVER_PORT_DEV;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

// jalur utama dari api
app.use("/api/auth", authRouter);
app.use("/api", historyRouter);
app.use("/api", culinaryRouter);
app.use("/api", tourPackageRouter);
app.use("/api", uMKMProductRouter);
app.use("/api", newsRouter);

app.listen(PORT, () => {
  console.log(`Listening on port : ${PORT}`);
});
