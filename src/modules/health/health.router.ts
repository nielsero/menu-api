import { Router } from "express";
import { GetHealthController } from "@/modules/health/controllers";

export class HealthRouter {
  constructor(private readonly getHealthController: GetHealthController) {}

  setup(router: Router) {
    router.get("/health", this.getHealthController.handle.bind(this.getHealthController));
  }
}
