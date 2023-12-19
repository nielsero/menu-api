import { app } from "@/app";
import { PORT } from "@/config";
import { domainErrorHandler, errorHandler, notFoundHandler, requestLogger } from "@/middleware";
import { logger } from "@/utils/log";
import { buyHealthRouter } from "@/store/health";
import { buyAuthRouter } from "@/store/auth";
import { buyMenuRouter } from "@/store/menu";
import { buyMenuItemRouter } from "@/store/menu-item";

main();

async function main(): Promise<void> {
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
