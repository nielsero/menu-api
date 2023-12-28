import { AuthRouter } from "@/modules/auth";
import { buyAuthControllers } from "./controllers.store";

type Store = AuthRouter;

const authRouter = new AuthRouter(buyAuthControllers());

export const buyAuthRouter = (): Store => authRouter;
