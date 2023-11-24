import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import courseRoute from "./routes/courseRoute.js";
import classRoute from "./routes/classRoute.js";
import studentRoute from "./routes/studentRoute.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";

const port = process.env.PORT;
const app = express();

app.use(cors());
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoute);
app.use("/api/classes", classRoute);
app.use("/api/students", studentRoute);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use(notFound);
app.use(errorHandler);
app.listen(port, () => {
  console.log("listening on port", port);
});
