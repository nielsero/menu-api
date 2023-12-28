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
  requestValidator: registerUserValidator,
  service: registerUserService,
});
const loginUserController = new LoginUserController({
  requestValidator: loginUserValidator,
  service: loginUserService,
});
const getUserSessionController = new GetUserSessionController(getUserSessionService);

// Export
export const buyRegisterUserController = () => registerUserController;
export const buyLoginUserController = () => loginUserController;
export const buyGetUserSessionController = () => getUserSessionController;
