import { Request, Response } from "express";

export class HealthController {
  handle(req: Request, res: Response) {
    res.json({ message: "Server is up and running!" });
  }
}
