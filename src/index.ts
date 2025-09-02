import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./db/config";
import indexRouter from "./routers/routes";
import ErrorHandler from "./utils/errorHandler";
dotenv.config();

const app = express();

app.use(helmet());
app.use(cors({
    credentials: true,
}));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(compression());

app.use("/api", indexRouter);
app.get("/", (req, res) => {
  res.send("Hello World TypeScript");
});

app.use((err: any, req: any, res: any, next: any) => {
  ErrorHandler(err, req, res, next);
});

// const server = http.createServer(app);
// const PORT = process.env.PORT || 8080;
// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// Start server only after database connection is established
const startServer = async () => {
  try {
    // Connect to database first
    await connectDB();
    
    // Start the server
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();