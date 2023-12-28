import {
  RegisterUserController,
  LoginUserController,
  GetUserSessionController,
} from "@/modules/auth/controllers";
import {
  buyGetUserSessionService,
  buyLoginUserService,
  buyLoginUserValidator,
  buyRegisterUserService,
  buyRegisterUserValidator,
} from "@/modules/auth/store";

// Setup
const registerUserValidator = buyRegisterUserValidator();
const loginUserValidator = buyLoginUserValidator();
const registerUserService = buyRegisterUserService();
const loginUserService = buyLoginUserService();
const getUserSessionService = buyGetUserSessionService();

// Build
const registerUserController = new RegisterUserController({
  validator: registerUserValidator,
  service: registerUserService,
});
const loginUserController = new LoginUserController({
  validator: loginUserValidator,
  service: loginUserService,
});
const getUserSessionController = new GetUserSessionController(getUserSessionService);

// Export
export const buyRegisterUserController = () => registerUserController;
export const buyLoginUserController = () => loginUserController;
export const buyGetUserSessionController = () => getUserSessionController;
