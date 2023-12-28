import { app } from "@/app";
import { PORT } from "@/config/constants";
import { mongoConnect } from "@/config/mongo";
import { logger } from "@/utils/logger";
import { buyHealthRouter } from "@/modules/health/store";
import { buyAuthRouter } from "@/modules/auth/store";
import { buyMenuRouter } from "@/modules/menu/store";
import { buyMenuItemRouter } from "@/modules/menu-item/store";
import { notFoundHandler } from "@/middleware/404-handler";
import { domainErrorHandler } from "@/middleware/domain-error-handler";
import { errorHandler } from "@/middleware/error-handler";
import { requestLogger } from "@/middleware/request-logger";

main();

async function main(): Promise<void> {
  const isMongoConnected = await mongoConnect();
  if (!isMongoConnected) {
    logger.error("[main] Mongo connection failed");
    process.exit(1);
  }
  const healthRouter = buyHealthRouter();
  const authRouter = buyAuthRouter();
  const menuRouter = buyMenuRouter();
  const menuItemRouter = buyMenuItemRouter();
  app.use(requestLogger);
  healthRouter.setup(app);
  authRouter.setup(app);
  menuRouter.setup(app);
  menuItemRouter.setup(app);
  app.use("*", notFoundHandler);
  app.use(domainErrorHandler);
  app.use(errorHandler);
  app.listen(PORT, () => {
    logger.info(`[main] Server running at http://localhost:${PORT}`);
  });
}
