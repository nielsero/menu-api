import { app } from "@/app";
import { PORT } from "@/config";
import { makeAuth, makeHealth } from "@/factories";
import { errorHandler, notFoundHandler, requestLogger } from "@/middleware";
import { logger } from "@/utils";

main();

async function main(): Promise<void> {
  const { healthRouter } = makeHealth();
  const { authRouter } = makeAuth();
  app.use(requestLogger);
  healthRouter.setup(app);
  authRouter.setup(app);
  app.use("*", notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    logger.info(`[main] Server running at http://localhost:${PORT}`);
  });
}
