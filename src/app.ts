import cors from "cors";
import express from "express";
import "express-async-errors";
import helmet from "helmet";

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
export { app };
