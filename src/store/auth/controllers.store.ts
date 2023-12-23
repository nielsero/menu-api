import {
  RegisterUserController,
  LoginUserController,
  GetUserSessionController,
} from "@/modules/auth/controllers";
import { buyAuthServices } from "@/store/auth";

type Store = {
  registerUserController: RegisterUserController;
  loginUserController: LoginUserController;
  getUserSessionController: GetUserSessionController;
};

const { registerUserService, loginUserService, getUserSessionService } = buyAuthServices();
const registerUserController = new RegisterUserController(registerUserService);
const loginUserController = new LoginUserController(loginUserService);
const getUserSessionController = new GetUserSessionController(getUserSessionService);

export const buyAuthControllers = (): Store => {
  return { registerUserController, loginUserController, getUserSessionController };
};
