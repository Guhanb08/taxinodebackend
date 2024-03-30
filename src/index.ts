import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import config from "./config/index";
import routes from './routes/index';
import { notFoundHandler, errorHandler } from "./utils/appError";
import { connectDB } from "./model/index";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

connectDB();

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to Taxi Backend",
  });
});
app.use('/taxiapi/', routes);
app.all("*", notFoundHandler);
app.use(errorHandler);


app.listen(config.PORT, () => {
  console.log(`Taxi Backend Service listening to  ${config.BASE_URL}`);
});
