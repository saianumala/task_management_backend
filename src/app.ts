import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import apiRouter from "./routes";
const app = express();
const PORT = process.env.PORT || 3000;
const corsOptions = {
  origin: [process.env.CORS_ORIGIN!, process.env.NATIVE_APP_ORIGIN!],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true,
};

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", apiRouter);
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
