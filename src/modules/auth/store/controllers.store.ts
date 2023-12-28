import {
  RegisterUserController,
  LoginUserController,
  GetUserSessionController,
} from "@/modules/auth/controllers";
import { buyGetUserSessionService, buyLoginUserService, buyRegisterUserService } from "@/modules/auth/store";

const registerUserService = buyRegisterUserService();
const loginUserService = buyLoginUserService();
const getUserSessionService = buyGetUserSessionService();
const registerUserController = new RegisterUserController(registerUserService);
const loginUserController = new LoginUserController(loginUserService);
const getUserSessionController = new GetUserSessionController(getUserSessionService);
export const buyRegisterUserController = () => registerUserController;
export const buyLoginUserController = () => loginUserController;
export const buyGetUserSessionController = () => getUserSessionController;
