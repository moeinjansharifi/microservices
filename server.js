import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

const PORT = 5000;

// Proxy requests for UserService
app.use(
  "/auth",
  createProxyMiddleware({ target: "http://localhost:5001", changeOrigin: true })
);

// Proxy requests for PlacesService
app.use(
  "/places",
  createProxyMiddleware({ target: "http://localhost:5002", changeOrigin: true })
);

// Proxy requests for BookingService
app.use(
  "/booking",
  createProxyMiddleware({ target: "http://localhost:5003", changeOrigin: true })
);

app.get("test", (req, res) => {
  console.log("This is main server");
});
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
