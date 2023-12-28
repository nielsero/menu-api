import { GetHealthController } from "@/modules/health/controllers";

// Build
const getHealthController = new GetHealthController();

// Export
export const buyGetHealthController = () => getHealthController;
