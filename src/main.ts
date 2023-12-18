import { app } from "@/app";
import { PORT } from "@/config";
import { makeAuth, makeHealth, makeMenu, makeMenuItem } from "@/factories";
import { domainErrorHandler, errorHandler, notFoundHandler, requestLogger } from "@/middleware";
import { logger } from "@/utils";

main();

async function main(): Promise<void> {
  const { healthRouter } = makeHealth();
  const { authRouter } = makeAuth();
  const { menuRouter } = makeMenu();
  const { menuItemRouter } = makeMenuItem();
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
