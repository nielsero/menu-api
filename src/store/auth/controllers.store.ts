import { RegisterUserController, LoginUserController } from "@/modules/auth/controllers";
import { buyAuthServices } from "@/store/auth";

type Store = {
  registerUserController: RegisterUserController;
  loginUserController: LoginUserController;
};

const { registerUserService, loginUserService } = buyAuthServices();
const registerUserController = new RegisterUserController(registerUserService);
const loginUserController = new LoginUserController(loginUserService);

export const buyAuthControllers = (): Store => {
  return { registerUserController, loginUserController };
};
