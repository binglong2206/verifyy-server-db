require("dotenv").config();
import { AppDataSource } from "./data-source";
import { User } from "./entity/User";
import express, {
  NextFunction,
  Response,
  Request,
  ErrorRequestHandler,
} from "express";
import { appendFile } from "fs";
import cookieParser from "cookie-parser";
import path from "path";
import indexRouter from "./routes";
import cors from "cors";
import csurf from "csurf";
const isProduction = process.env.NODE_ENV === "production";

// Init
AppDataSource.initialize()
  .then(async () => {
    // Init
    const app = express();

    // Security Middleware
    app.use(cors()); // For development;
    // app.use(
    //   csurf({
    //     cookie: {
    //       secure: isProduction,
    //       sameSite: isProduction,
    //       httpOnly: true,
    //     },
    //   })
    // );

    // Parsing
    app.use(cookieParser());
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.static(path.join(__dirname, "public"))); // Serve all files in url -> localhost:3000/dog.jpg

    // Main routing
    app.use("/", indexRouter);

    // 404
    app.use((req: Request, res: Response, next: NextFunction) => {
      res.status(404).send("site not found");
    });

    // Error Handler
    app.use(
      (
        err: ErrorRequestHandler,
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        res.send(err);
      }
    );

    app.listen(8000, () => console.log("server listining to: 8000"));
  })
  .catch((error) => console.log(error));
