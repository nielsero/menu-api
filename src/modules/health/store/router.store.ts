import { HealthRouter } from "@/modules/health";
import { buyGetHealthController } from "@/modules/health/store";

// Setup
const getHealthController = buyGetHealthController();

// Build
const healthRouter = new HealthRouter(getHealthController);

// Export
export const buyHealthRouter = () => healthRouter;
