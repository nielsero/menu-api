import { AuthRouter } from "@/modules/auth";
import {
  buyGetUserSessionController,
  buyLoginUserController,
  buyRegisterUserController,
} from "@/modules/auth/store";

// Setup
const registerUserController = buyRegisterUserController();
const loginUserController = buyLoginUserController();
const getUserSessionController = buyGetUserSessionController();

// Build
const authRouter = new AuthRouter({ registerUserController, loginUserController, getUserSessionController });

// Export
export const buyAuthRouter = () => authRouter;
