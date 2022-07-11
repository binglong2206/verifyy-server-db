require("dotenv").config();
import { AppDataSource } from "./data-source";
import { User } from "./entity/User";
import { Book } from "./entity/Book";
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
        origin: "http://localhost:3000",
        credentials: true,
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

    // Main routing
    app.use("/", indexRouter);

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
        res.status(400).send("MY OWN ERROR HANDLER");
      }
    );

    app.listen(8000, () => console.log("server listining to: 8000"));
  })
  .catch((error) => console.log(error));