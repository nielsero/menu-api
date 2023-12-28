import { AuthRouter } from "@/modules/auth";
import {
  buyGetUserSessionController,
  buyLoginUserController,
  buyRegisterUserController,
} from "@/modules/auth/store";

const registerUserController = buyRegisterUserController();
const loginUserController = buyLoginUserController();
const getUserSessionController = buyGetUserSessionController();
const authRouter = new AuthRouter({ registerUserController, loginUserController, getUserSessionController });
export const buyAuthRouter = () => authRouter;
