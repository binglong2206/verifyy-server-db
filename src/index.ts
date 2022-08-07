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
import fileupload from 'express-fileupload'

const isProduction = process.env.NODE_ENV === "production";

// Init
AppDataSource.initialize()
  .then(async () => {
    console.log("Postgres Connected");

    // Init
    const app = express();

    // Security Middleware
    app.use(
      cors({
        credentials: true,
        origin: 'http://localhost:0298743'
      })
    );

    // app.use(
    //   csurf({ss
    //     cookie: {
    //       secure: isProduction,
    //       sameSite: isProduction,
    //       httpOnly: true,
    //     },
    //   })
    // );

    // Parsing
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(path.join(__dirname, "public"))); // Serve all files in url -> localhost:3000/dog.jpg
    app.use(fileupload()) 

    // Main routing
    app.use("/api", indexRouter);

    // 404
    app.use((req: Request, res: Response, next: NextFunction) => {
      res.status(404).send("site not found");
    });

    // Main Error Handler
    app.use(
      (
        err: ErrorRequestHandler,
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        console.error("MY OWN ERROR HANDLER");
        console.error(err);
        res.status(400).end()
      }
    );

    app.listen(8000, () => console.log("server listining to: 8000"));
  })
  .catch((error) => console.log(error));
