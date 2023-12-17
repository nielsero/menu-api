import { Router } from "express";
import { GetHealthController } from "@/modules/health";

export type HealthControllers = {
  getHealthController: GetHealthController;
};

export class HealthRouter {
  private readonly getHealthController: GetHealthController;

  constructor(private readonly controllers: HealthControllers) {
    this.getHealthController = controllers.getHealthController;
  }

  setup(router: Router) {
    router.get("/health", this.getHealthController.handle.bind(this.getHealthController));
  }
}
