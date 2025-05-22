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
const PORT = process.env.SERVER_PORT_DEV || 8000; // Railway mengatur PORT otomatis

// Menambahkan origin untuk frontend Vercel
const frontendOrigin = process.env.FRONTEND_URL || "http://localhost:3000"; // Default untuk development

app.use(
  cors({
    origin: [
      frontendOrigin,
      "https://palenda-apps-sync.vercel.app",
      "https://palenda-apps.vercel.app",
      "http://localhost:3000",
    ], // Menambahkan origin Vercel
    credentials: true, // Jika kamu menggunakan cookies atau session
  })
);

app.use(express.json());

// Jalur utama dari API
app.use("/api/auth", authRouter);
app.use("/api", historyRouter);
app.use("/api", culinaryRouter);
app.use("/api", tourPackageRouter);
app.use("/api", uMKMProductRouter);
app.use("/api", newsRouter);

app.listen(PORT, () => {
  console.log(`Listening on port : ${PORT}`);
});
