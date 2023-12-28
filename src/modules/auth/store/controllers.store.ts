import {
  RegisterUserController,
  LoginUserController,
  GetUserSessionController,
} from "@/modules/auth/controllers";
import { buyGetUserSessionService, buyLoginUserService, buyRegisterUserService } from "@/modules/auth/store";

// Setup
const registerUserService = buyRegisterUserService();
const loginUserService = buyLoginUserService();
const getUserSessionService = buyGetUserSessionService();

// Build
const registerUserController = new RegisterUserController(registerUserService);
const loginUserController = new LoginUserController(loginUserService);
const getUserSessionController = new GetUserSessionController(getUserSessionService);

// Export
export const buyRegisterUserController = () => registerUserController;
export const buyLoginUserController = () => loginUserController;
export const buyGetUserSessionController = () => getUserSessionController;
