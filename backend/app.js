import express from "express";
const app = express();
import { connectDatabase } from "./config/db.connect.js";
import errorMiddleware from "./middlewares/errors.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
// Handle Uncaught exceptions
process.on("uncaughtException", (error) => {
  console.log(`ERROR: ${error}`);
  console.log("Shuting down server due to Unhandled Promise Rejection");
  process.exit(1);
});
dotenv.config({ path: "backend/config/config.env" });

// Config CORS
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", true);
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  next();
});

//  Connecting to database
connectDatabase();

app.use(express.json());
app.use(cookieParser());
// Import all routes
import productRoutes from "./routes/products.js";
import authRoutes from "./routes/auth.js";
import orderRoutes from "./routes/order.js";
app.use("/api/v1", productRoutes);
app.use("/api/v1", authRoutes);
app.use("/api/v1", orderRoutes);
// Using error middleware
app.use(errorMiddleware);

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server started on PORT: ${process.env.PORT} IN ${process.env.NODE_ENV} node.`
  );
});

// Handle Unhandled Promise  rejections
process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err}`);
  console.log("Shuting down server due to Unhandled Promise Rejection");
  server.close(() => {
    process.exit(1);
  });
});
